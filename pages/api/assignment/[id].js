/** /pages/api/assignment/assignment.js **/
import { Types } from "mongoose";
import dbConnect from "../../../lib/dbConnect"
import Assignment from "../../../models/lecture/Assignment"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            if (req.query?.id === undefined) {
                res.status(400).json({ success: false, data: [], error: "UndefinedId"});
                return;
            }
            let query = {
                _id: new Types.ObjectId(req.query?.id),
            };
            const assignments = await Assignment.find(query);
            res.status(200).json({ success: true, data: assignments })
            break

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}
