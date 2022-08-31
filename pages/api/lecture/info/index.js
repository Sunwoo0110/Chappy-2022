import dbConnect from "../../../../lib/dbConnect"
import Info from "../../../../models/lecture/Info"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const lectures = await Info.find(req.query);
                res.status(200).json({ success: true, data: lectures });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}