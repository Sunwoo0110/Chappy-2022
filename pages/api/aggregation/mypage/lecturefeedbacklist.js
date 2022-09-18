
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

                const assignments = await axios.get('/api/lecture/assignment', {
                    params: {
                        lecture_id: lecture.data.data[0]._id,
                        is_ready: true, //임시저장 제외하기 위한 조건
                    }
                });
                var assignmentsID = await Promise.all(assignments.data.data.map( async (assignment) => {
                    return assignment._id;
                }))
                // console.log("assignmentsID: ", assignmentsID)

                const submissions = await axios.get('/api/submission/submission', {
                    params: {
                        ref_id: {$in: examsID},
                        user_id: req.query.user_id,
                        submission_state: 1,
                    }
                });
                const submissionsID = await Promise.all(submissions.data.data.map( async (submission) => {
                    return submission._id;
                }))                
                // console.log("submissionsID: ", submissionsID)

                const feedbacks = await axios.get('/api/submission/feedback', {
                    params: {
                        submission_id: {$in: submissionsID},
                    }
                });

                // console.log("ex_feedbacks: ", ex_feedbacks.data.data)
                // console.log("as_feedbacks: ", as_feedbacks.data.data)

                let myfeedback = {};
                myfeedback["name"] = lecture.data.data[0].name;
                myfeedback["total"] = ex_feedbacks.data.data.length+as_feedbacks.data.data.length;
                myfeedback["exam"] = ex_feedbacks.data.data.length;
                myfeedback["assignment"] = as_feedbacks.data.data.length;

                console.log("myfeedback: ",myfeedback)
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