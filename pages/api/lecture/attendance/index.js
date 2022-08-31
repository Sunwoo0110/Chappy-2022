import dbConnect from "../../../../lib/dbConnect"
import Attendance from "../../../../models/lecture/Attendance"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const attendance = await Attendance.find(req.query);
                res.status(200).json({ success: true, data: attendance });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}
