import dbConnect from "../../../../lib/dbConnect"
import Submission from "../../../../models/submission/Submission"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const submissions = await Submission.find(req.query);
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
