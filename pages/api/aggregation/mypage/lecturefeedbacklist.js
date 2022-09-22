
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
                        // $project: { weeks : 0, },
                    }
                });
                var assignmentsID = await Promise.all(assignments.data.data.map( async (assignment) => {
                    return assignment._id;
                }))
                // console.log("assignmentsID: ", assignmentsID)

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
                // console.log("submissionsID: ", submissionsID)

                let feedbacks=[];

                if(submissionsID.length!==0){
                    feedbacks = await axios.get('/api/submission/feedback', {
                        params: {
                            submission_id: {$in: submissionsID},
                        }
                    });
                    feedbacks=feedbacks.data.data;
                }
                // console.log("feedbacks: ", feedbacks)

                let myfeedback = [];
                for(let f of feedbacks){
                    let fb = {};
                    fb["lecture"] = lecture.data.data[0].name;
                    let sub=submissions.find(s=>s._id===f.submission_id)
                    let a=assignments.data.data.find(a=>a._id===sub.ref_id)
                    fb["title"] = a.title;
                    let d= new Date(sub.submission_date);
                    fb["date"] = d.getFullYear()+"."+d.getMonth()+"."+d.getDate();
                    myfeedback.push(fb);                    
                }

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