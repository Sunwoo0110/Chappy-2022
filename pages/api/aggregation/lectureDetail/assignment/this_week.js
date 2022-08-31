import axios from "../../../../../lib/api";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try{
                let week = 1; //week어떻게 보여줄건지,,??
                
                const assignments = await axios.get('/api/lecture/assignment', {
                    params: {
                        lecture_id: req.query.lecture_id,
                        temp: false,
                        type: 0,
                        weeks: week,
                        is_opened: true,
                    }
                })
                // .then(function (response) {
                //     console.log(response.data);
                // })
                // .catch(function (error) {
                //     console.log(error);
                // });

                const submissions = await axios.get('/api/submission/submission', {
                    params: {
                        lecture_id: req.query.lecture_id,
                        user_id: req.query.user_id,
                        submission_state:1,
                    }
                })

                const submissionRefIds = await Promise.all(submissions.data.data.map( async (submission)=>{
                    return submission.ref_id;
                }));

                let thisWeekAssignments = await Promise.all(assignments.data.data.map( async (assignment) => {
                    if(!submissionRefIds.includes(assignment._id))
                        return assignment;
                }))
                res.status(200).json({success: true, data: thisWeekAssignments})

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
