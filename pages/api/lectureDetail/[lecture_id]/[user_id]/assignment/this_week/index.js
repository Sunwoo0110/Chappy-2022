import dbConnect from "../../../../../../../lib/dbConnect";
import Assignment from "../../../../../../../models/lecture/Assignment"
import Submission from "../../../../../../../models/submission/Submission";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try{
                let week = 1; //week어떻게 보여줄건지,,??
                const assignments = await Assignment.find({
                    "temp": false,
                    "type": 0,
                    "weeks": week,
                    "is_opened": true,
                });

                let thisWeekAssignments = await Promise.all(assignments.map( async (assignment ) => {
                    let noneSubmitted = await Submission.find({
                        "submission_state":1,
                        "ref_id":assignment._id
                    });
                    if(noneSubmitted.length==0)
                        return assignment;
                }));
                console.log(thisWeekAssignments);

                res.status(200).json({success: true, data: thisWeekAssignments})

            } catch (error) {
                if(error.name=="CastError")
                    res.status(200).json({success: true, data: -1})            
                res.status(400).json({success: false, error: error})
            }
            break

        case 'POST':
            try{
                console.log(typeof req.body);
                let assignment;
                if (typeof req.body === 'object'){
                    assignment = await Assignment.create(req.body);
                }
                else if (typeof req.body === 'string'){
                    if(req.body=="clear"){
                        await Assignment.remove({});
                        assignment = "removed all data";
                    }
                }
                else{
                    assignment = await Assignment.find({_id: req.body})
                }
                res.status(200).json({success: true, data: assignment})
            } catch(error){
                res.status(400).json({success: false, error: error})
            }
            break

        case 'DELETE':
            try {
                console.log('delete:', req.body.id);
                const result = await Notice.findByIdAndDelete(req.body.id)
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break    

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}
