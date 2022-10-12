import dbConnect from "../../../../lib/dbConnect"
import Grade from "../../../../models/submission/Grade"
import qs from "qs";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                let query = qs.parse(req.query);
                const grades = await Grade.find(query);
                res.status(200).json({ success: true, data: grades });
            } catch (error) {
                console.log("error: ",error)
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}
