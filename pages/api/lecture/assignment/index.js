import dbConnect from "../../../../lib/dbConnect"
import Assignment from "../../../../models/lecture/Assignment"
import qs from "qs";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                let query = qs.parse(req.query);
                console.log("=================================\n", req.query);
                console.log("=================================\n", query);
                const assignments = await Assignment.find(query);
                res.status(200).json({ success: true, data: assignments });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}
