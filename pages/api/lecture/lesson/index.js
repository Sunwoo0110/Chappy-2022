import dbConnect from "../../../../lib/dbConnect"
import Lesson from "../../../../models/lecture/Lesson"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const lessons = await Lesson.find({"lecture_id": req.query.lecture_id});
                res.status(200).json({ success: true, data: lessons });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

       default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}