import dbConnect from "../../../../lib/dbConnect"
import Notice from "../../../../models/lecture/Notice"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const notice = await Notice.find(req.query);
                res.status(200).json({ success: true, data: notice });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}
