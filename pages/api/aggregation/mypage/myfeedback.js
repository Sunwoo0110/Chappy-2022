
import dbConnect from "../../../../lib/dbConnect"

import axios from "../../../../lib/api";


export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();    

    switch (method) {
        case 'GET':
            try {
                // 유저가 수강중인 강의 목록 조회
                const users = await axios.get('/api/user/profile', {
                    params: {
                        _id: req.query.user_id,
                    }
                });
                var lecID = users.data.data[0].lecture_list;
                

                // 해당 강의들의 모든 과제 목록 조회
                const assignments = await axios.get('/api/lecture/assignment', {
                    params: {
                        lecture_id: {$in: lecID},
                        is_ready: true, //임시저장 제외하기 위한 조건
                    }
                });
                var assignmentsID = await Promise.all(assignments.data.data.map( async (assignment) => {
                    return assignment._id;
                }))
                
                // 유저가 제출한 과제 중 제출 완료만 필터링
                const submissions = await axios.get('/api/submission/submission', {
                    params: {
                        ref_id: {$in: assignmentsID},
                        user_id: req.query.user_id,
                        submission_state: 1,
                    }
                });
                const submissionsID = await Promise.all(submissions.data.data.map( async (submission) => {
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
                
                // 확인한 피드백만 필터링
                let checked_feedbacks=[];
                if(submissionsID.length!==0){
                    checked_feedbacks = await axios.get('/api/submission/feedback', {
                        params: {
                            submission_id: {$in: submissionsID},
                            check: true,
                        }
                    });
                    checked_feedbacks=checked_feedbacks.data.data;
                }
                
                // 제출하지 않은 과제 수
                let missed=0;
                const submissionsRef = await Promise.all(submissions.data.data.map( async (submission) => {
                    return submission.ref_id;
                }))

                for(let assignment of assignments.data.data){
                    if(!submissionsRef.includes(assignment._id)){
                        missed+=1;
                    }
                }
                // 최종 피드백 결과
                let myfeedback = {};
                myfeedback["total_feedback"] = feedbacks.length;
                myfeedback["checked_feedback"] = checked_feedbacks.length;
                myfeedback["missed"] = missed;

                res.status(200).json({ success: true, data: myfeedback});
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}