import dbConnect from "../../../../lib/dbConnect"
import Info from "../../../../models/lecture/Info"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'POST':
            try {
                const info = await Info.aggregate(req.body.pipeline);
                
                res.status(200).json({ success: true, data: info });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}
