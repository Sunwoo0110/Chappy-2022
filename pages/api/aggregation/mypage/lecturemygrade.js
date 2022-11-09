
import dbConnect from "../../../../lib/dbConnect"

import axios from "../../../../lib/api";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();    

    switch (method) {
        case 'GET':
            try {
                const lecture = await axios.get('/api/lecture/info', {
                    params: {
                        _id: req.query.lecture_id,
                    }
                });

                const exams = await axios.get('/api/lecture/assignment', {
                    params: {
                        lecture_id: lecture.data.data[0]._id,
                        type: 1, //시험
                        is_ready: true, //임시저장 제외하기 위한 조건
                    }
                });
                const assignments = await axios.get('/api/lecture/assignment', {
                    params: {
                        lecture_id: lecture.data.data[0]._id,
                        type: 0, //과제
                        is_ready: true, //임시저장 제외하기 위한 조건
                        // $project: { weeks : 0, },
                    }
                });
                var examsID = await Promise.all(exams.data.data.map( async (exam) => {
                    return exam._id;
                }))
                var assignmentsID = await Promise.all(assignments.data.data.map( async (assignment) => {
                    return assignment._id;
                }))
                // console.log("examsID: ", examsID)
                // console.log("assignmentsID: ", assignmentsID)

                let ex_submissions=[];
                let as_submissions=[];
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
                // console.log("ex_submissionsID: ", ex_submissionsID)
                // console.log("as_submissionsID: ", as_submissionsID)

                let ex_feedbacks=[];
                let as_feedbacks=[];

                if(ex_submissionsID.length!==0){
                    ex_feedbacks = await axios.get('/api/submission/feedback', {
                        params: {
                            submission_id: {$in: ex_submissionsID},
                        }
                    });
                    ex_feedbacks=ex_feedbacks.data.data;
                }

                if(as_submissionsID.length!==0){
                    as_feedbacks = await axios.get('/api/submission/feedback', {
                        params: {
                            submission_id: {$in: as_submissionsID},
                        }
                    });
                    as_feedbacks=as_feedbacks.data.data;
                }
                // console.log("ex_feedbacks: ", ex_feedbacks)
                // console.log("as_feedbacks: ", as_feedbacks)

                let myfeedback = {};
                myfeedback["name"] = lecture.data.data[0].name;
                myfeedback["total"] = ex_feedbacks.length+as_feedbacks.length;
                myfeedback["exam"] = ex_feedbacks.length;
                myfeedback["assignment"] = as_feedbacks.length;

                // console.log("myfeedback: ",myfeedback)
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