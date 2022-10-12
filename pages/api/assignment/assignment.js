/** /pages/api/assignment/assignment.js **/
import dbConnect from "../../../lib/dbConnect"
import Assignment from "../../../models/lecture/Assignment"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const assignments = await Assignment.find({})
                res.status(200).json({ success: true, data: assignments })
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break

        case 'POST':
            try {
                let assignment;
                if (typeof req.body === 'object')
                    assignment = await Assignment.create(req.body)
                else
                    assignment = await Assignment.find({ _id: req.body })
                res.status(201).json({ success: true, data: assignment })
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break

        case 'DELETE':
            try {
                console.log('delete:', req.body.id);
                const result = await Assignment.findByIdAndDelete(req.body.id)
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}