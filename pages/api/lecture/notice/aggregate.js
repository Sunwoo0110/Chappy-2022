import dbConnect from "../../../../lib/dbConnect"
import Notice from "../../../../models/lecture/Notice"
import qs from "qs";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'POST':
            try {
                const notices = await Notice.aggregate(req.body.pipeline);
                res.status(200).json({ success: true, data: notices });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}
