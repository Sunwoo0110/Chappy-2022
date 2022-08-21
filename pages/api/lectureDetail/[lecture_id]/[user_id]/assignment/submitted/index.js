import dbConnect from "../../../../../../../lib/dbConnect";
import Assignment from "../../../../../../../models/lecture/Assignment"
import Submission from "../../../../../../../models/submission/Submission";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try{
                const submissionInfos = await Submission.find({
                    "lecture_id":req.query.lecture_id,
                    "user_id":req.query.user_id, 
                    "type":0, 
                    "submission_state":1
                });

                let assignment;
                let submittedAssignments = await Promise.all(submissionInfos.map( async (info) => {
                    let submittedAssignment = {};
                    assignment = await Assignment.find({ "_id":info.ref_id, "lecture_id":req.query.lecture_id, "temp":false});
                    submittedAssignment["submission"] = info;
                    submittedAssignment["assignment"] = assignment[0];
                    return submittedAssignment;                    
                }));
                // console.log(submittedAssignments);

                res.status(200).json({success: true, data: submittedAssignments})

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
