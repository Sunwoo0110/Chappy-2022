import dbConnect from "../../../../../../lib/dbConnect";
import Assignment from "../../../../../../models/lecture/Assignment";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try{
                let week = 1; //week어떻게 보여줄건지,,??
                const exams = await Assignment.find({
                    "type":1,
                    "temp":false
                })

                let scheduledExams = await Promise.all(exams.map( async (exam) => {
                    if(exam.weeks >= week)
                        return exam;
                }));

                res.status(200).json({success: true, data: scheduledExams})

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
