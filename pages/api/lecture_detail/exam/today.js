import dbConnect from "../../../../lib/dbConnect"
import Exam from "../../../../models/Exam";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try{
                const todayDate = new Date();
                const year = todayDate.getFullYear();
                const month = todayDate.getMonth();
                const day = todayDate.getDay();
                
                const today = year+"/"+month+"/"+day;
                const exams = await Exam.find().where('date').equlas(today);
                res.status(200).json({success: true, data: exams})
            } catch (error) {
                res.status(400).json({success: false, error: error})
            }
            break

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}
