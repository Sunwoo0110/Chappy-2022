import dbConnect from "../../../../lib/dbConnect"
import Lesson from "../../../../models/lecture/Lesson"
import qs from "qs";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                let query = qs.parse(req.query);
                const lessons = await Lesson.find(query);
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