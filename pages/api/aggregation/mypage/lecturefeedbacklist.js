
import dbConnect from "../../../../lib/dbConnect"

import axios from "../../../../lib/api";


export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();    

    switch (method) {
        case 'GET':
            try {
                // 강의 정보 조회
                const lecture = await axios.get('/api/lecture/info', {
                    params: {
                        _id: req.query.lecture_id,
                    }
                });

                // 해당 강의의 오픈된 과제 목록 조회
                const assignments = await axios.get('/api/lecture/assignment', {
                    params: {
                        lecture_id: lecture.data.data[0]._id,
                        is_ready: true, //임시저장 제외하기 위한 조건
                    }
                });
                var assignmentsID = await Promise.all(assignments.data.data.map( async (assignment) => {
                    return assignment._id;
                }))

                // 유저가 제출한 과제 중 제출 완료만 필터링
                let submissions=[];
                if(assignmentsID.length!==0){
                    submissions = await axios.get('/api/submission/submission', {
                        params: {
                            ref_id: {$in: assignmentsID},
                            user_id: req.query.user_id,
                            submission_state: 1,
                        }
                    });  
                    submissions=submissions.data.data;
                }

                const submissionsID = await Promise.all(submissions.map( async (submission) => {
                    return submission._id;
                }))
                
                // 해당 제출물에 대한 피드백 조회
                let feedbacks=[];

                if(submissionsID.length!==0){
                    feedbacks = await axios.get('/api/submission/feedback', {
                        params: {
                            submission_id: {$in: submissionsID},
                        }
                    });
                    feedbacks=feedbacks.data.data;
                }
                
                // 피드백 데이터 정리: 강의 제목, 과제 제목, 날짜
                let myfeedback = [];
                for(let f of feedbacks){
                    let fb = {};
                    fb["lecture"] = lecture.data.data[0].name;
                    let sub=submissions.find(s=>s._id===f.submission_id)
                    let a=assignments.data.data.find(a=>a._id===sub.ref_id)
                    fb["title"] = a.title;

                    // 가장 최근 제출물
                    const latest_subs = await axios.get('api/submission/submission', {
                        params: {
                            user_id: sub.user_id,
                            ref_id: sub.ref_id
                        }
                    })

                    var min = latest_subs.data.data[0]
                    var findLatest = await Promise.all(latest_subs.data.data.map( async (submission) => {
                        if (submission.submission_date > min.submission_date ) {
                            min = submission
                        }
                        return submission._id;
                    }))
                    
                    let d= new Date(min.submission_date);
                    fb["date"] = d.getFullYear()+"."+(d.getMonth()+1)+"."+d.getDate();
                    fb["assignment_id"] = a._id;
                    myfeedback.push(fb);                    
                }

                
                res.status(200).json({ success: true, data: myfeedback });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}