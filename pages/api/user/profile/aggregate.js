import dbConnect from "../../../../lib/dbConnect"
import Profile from "../../../../models/user/Profile"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'POST':
            try {
                const profile = await Profile.aggregate(req.body.pipeline);
                res.status(200).json({ success: true, data: profile });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}
