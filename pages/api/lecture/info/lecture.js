import dbConnect from "../../../../lib/dbConnect"
import Info from "../../../../models/Lecture/Info"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const lecture = await Info.find({"_id": req.query.lecture_id});
                res.status(200).json({ success: true, data: lecture[0] });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

       default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}