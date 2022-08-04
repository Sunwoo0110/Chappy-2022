import dbConnect from "../../../../lib/dbConnect"
import Exam from "../../../../models/Exam";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();
    console.log(method);

    switch (method) {
        case 'POST':
            try{
                let exam;
                if (typeof req.body === 'object'){
                    exam = await Exam.create(req.body);
                }
                res.status(200).json({success: true, data: exam})
            } catch(error){
                res.status(400).json({success: false, error: error})
            }
            break
            
        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}
