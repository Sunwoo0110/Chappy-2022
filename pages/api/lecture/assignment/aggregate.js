import dbConnect from "../../../../lib/dbConnect"
import Assignment from "../../../../models/lecture/Assignment"
import qs from "qs";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'POST':
            try {
                const assignments = await Assignment.aggregate(req.body.pipeline);
                res.status(200).json({ success: true, data: assignments });
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}
