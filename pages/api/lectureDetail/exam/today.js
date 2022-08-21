import dbConnect from "../../../../lib/dbConnect"
import Exam from "../../../../models/Exam";
import moment from 'moment';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try{
                const todayDate = moment().format("YYYY/MM/DD");
                const exams = await Exam.find({"date":todayDate});

                if(exams.length==0)
                    res.status(200).json({success: true, data: null});
                else            
                    res.status(200).json({success: true, data: exams});                

            } catch (error) {
                res.status(400).json({success: false, error: error})
            }
            break

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}
