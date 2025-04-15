
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

                // 해당 강의의 시험 목록 조회 
                const exams = await axios.get('/api/lecture/assignment', {
                    params: {
                        lecture_id: lecture.data.data[0]._id,
                        type: {$in:[1,2,3]}, //시험
                        is_ready: true, //임시저장 제외하기 위한 조건
                    }
                });

                // 해당 강의의 과제 목록 조회
                const assignments = await axios.get('/api/lecture/assignment', {
                    params: {
                        lecture_id: lecture.data.data[0]._id,
                        type: 0, //과제
                        is_ready: true, //임시저장 제외하기 위한 조건
                    }
                });
                var examsID = await Promise.all(exams.data.data.map( async (exam) => {
                    return exam._id;
                }))
                var assignmentsID = await Promise.all(assignments.data.data.map( async (assignment) => {
                    return assignment._id;
                }))

                let ex_submissions=[];
                let as_submissions=[];

                // 제출 완료한 시험 제출물 조회
                if(examsID.length!==0){
                    ex_submissions = await axios.get('/api/submission/submission', {
                        params: {
                            ref_id: {$in: examsID},
                            user_id: req.query.user_id,
                            submission_state: 1,
                        }
                    });  
                    ex_submissions=ex_submissions.data.data;
                }  

                // 제출 완료한 과제 제출물 조회
                if(assignmentsID.length!==0){            
                    as_submissions = await axios.get('/api/submission/submission', {
                        params: {
                            ref_id: {$in: assignmentsID},
                            user_id: req.query.user_id,
                            submission_state: 1,
                            
                        }
                    });
                    as_submissions=as_submissions.data.data;
                }

                const ex_submissionsID = await Promise.all(ex_submissions.map( async (submission) => {
                    return submission._id;
                }))
                const as_submissionsID = await Promise.all(as_submissions.map( async (submission) => {
                    return submission._id;
                }))

                let ex_feedbacks=[];
                let as_feedbacks=[];

                // 시험 제출물 피드백 조회
                if(ex_submissionsID.length!==0){
                    ex_feedbacks = await axios.get('/api/submission/feedback', {
                        params: {
                            submission_id: {$in: ex_submissionsID},
                        }
                    });
                    ex_feedbacks=ex_feedbacks.data.data;
                }

                // 과제 제출물 피드백 조회
                if(as_submissionsID.length!==0){
                    as_feedbacks = await axios.get('/api/submission/feedback', {
                        params: {
                            submission_id: {$in: as_submissionsID},
                        }
                    });
                    as_feedbacks=as_feedbacks.data.data;
                }

                // 피드백 통계 결과 정리
                let myfeedback = {};
                myfeedback["name"] = lecture.data.data[0].name;
                myfeedback["total"] = ex_feedbacks.length+as_feedbacks.length;
                myfeedback["exam"] = ex_feedbacks.length;
                myfeedback["assignment"] = as_feedbacks.length;

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