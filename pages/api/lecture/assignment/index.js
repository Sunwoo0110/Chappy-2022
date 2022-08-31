import dbConnect from "../../../../lib/dbConnect"
import Assignment from "../../../../models/lecture/Assignment"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const assignments = await Assignment.find(req.query);
                res.status(200).json({ success: true, data: assignments });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}
