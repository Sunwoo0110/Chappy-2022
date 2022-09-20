import axios from "../../../../../lib/api";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try{
                const submissions = await axios.get('/api/submission/submission', {
                    params: {
                        lecture_id: req.query.lecture_id,
                        user_id: req.query.user_id,
                        type:0,
                        submission_state:1,
                    }
                });

                const submissions_ref_ids = await Promise.all(submissions.data.data.map( async (submission) => {
                    return submission.ref_id;
                }))

                const assignments = await axios.get('/api/lecture/assignment', {
                    params: {
                        _id: {$in: submissions_ref_ids}
                        // $addFields : { "__order" : { "$indexOfArray" : [ submissions_ref_ids, "$id" ] } },
                        // $sort: { "__order" : 1 }, 
                    }    
                })

                let submittedAssignments = [];
                for(let i=0; i<submissions_ref_ids.length; i++){
                    let submittedAssignment = {};
                    submittedAssignment["submission"] = submissions.data.data[i];
                    submittedAssignment["assignment"] = assignments.data.data[i];
                    submittedAssignments.push(submittedAssignment);                    
                }

                res.status(200).json({success: true, data: submittedAssignments});

            } catch (error) {
                if(error.name=="CastError")
                    res.status(200).json({success: true, data: -1})            
                res.status(400).json({success: false, error: error})
            }
            break

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}
