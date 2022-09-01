import dbConnect from "../../../../lib/dbConnect"
import Objection from "../../../../models/submission/Objection"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const objections = await Objection.find(req.query);
                res.status(200).json({ success: true, data: objections });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}
