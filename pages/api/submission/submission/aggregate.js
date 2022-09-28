import dbConnect from "../../../../lib/dbConnect"
import Submission from "../../../../models/submission/Submission"
import qs from "qs";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'POST':
            try {
                const submissions = await Submission.aggregate(req.body.pipeline);
                
                res.status(200).json({ success: true, data: submissions });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}
