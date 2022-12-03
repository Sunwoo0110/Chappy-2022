
import dbConnect from "../../../../lib/dbConnect"

import axios from "../../../../lib/api";


export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();    

    switch (method) {
        case 'GET':
            try {
                const users = await axios.get('/api/user/profile', {
                    params: {
                        _id: req.query.user_id,
                    }
                });
                var lecID = users.data.data[0].lecture_list;
                console.log("lecID: ", lecID)


                const assignments = await axios.get('/api/lecture/assignment', {
                    params: {
                        lecture_id: {$in: lecID},
                        is_ready: true, //임시저장 제외하기 위한 조건
                    }
                });
                var assignmentsID = await Promise.all(assignments.data.data.map( async (assignment) => {
                    return assignment._id;
                }))
                console.log("assignmentsID: ", assignmentsID)

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
                console.log("submissionsID: ", submissionsID.length)

                let feedbacks=[];
                if(submissionsID.length!==0){
                    feedbacks = await axios.get('/api/submission/feedback', {
                        params: {
                            submission_id: {$in: submissionsID},
                        }
                    });
                    console.log("feedbacks: ", feedbacks)
                    feedbacks=feedbacks.data.data;
                    
                }
                console.log("feedbacks: ", feedbacks)

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
                console.log("checked_feedbacks: ", checked_feedbacks)

                let missed=0;
                const submissionsRef = await Promise.all(submissions.data.data.map( async (submission) => {
                    return submission.ref_id;
                }))

                console.log("submissionsRef: ",submissionsRef)
                for(let assignment of assignments.data.data){
                    if(!submissionsRef.includes(assignment._id)){
                        console.log("assignment._id: ",assignment._id)
                        missed+=1;
                    }
                }

                let myfeedback = {};
                myfeedback["total_feedback"] = feedbacks.length;
                myfeedback["checked_feedback"] = checked_feedbacks.length;
                myfeedback["missed"] = missed;

                console.log("myfeedback: ",myfeedback)
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