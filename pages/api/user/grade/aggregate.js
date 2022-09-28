import dbConnect from "../../../../lib/dbConnect"
import Grade from "../../../../models/user/Grade"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'POST':
            try {
                const grades = await Grade.aggregate(req.body.pipeline);
                
                res.status(200).json({ success: true, data: grades });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}
