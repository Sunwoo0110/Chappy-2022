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
                
                // const assignments = await axios.get('/api/lecture/assignment', {
                //     params: {
                //         lecture_id: req.query.lecture_id,
                //         temp: false,
                //         type: 0,
                //         weeks: week,
                //         is_opened: true,
                //     }
                // })
                // .then(function (response) {
                //     console.log(response.data);
                // })
                // .catch(function (error) {
                //     console.log(error);
                // });

                let submittedAssignments = await Promise.all(submissions.data.data.map( async (submission) => {
                    let submittedAssignment = {};
                    let assignment = await axios.get('api/lecture/assignment', {
                        params: {
                            _id: submission.ref_id,
                            temp: false,
                        }
                    });
                    submittedAssignment["submission"] = submission;
                    submittedAssignment["assignment"] = assignment.data.data[0];
                    console.log(submittedAssignment)
                    return submittedAssignment;                    
                }))

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
