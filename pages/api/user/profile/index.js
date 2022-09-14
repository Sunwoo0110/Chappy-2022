import dbConnect from "../../../../lib/dbConnect"
import Profile from "../../../../models/user/Profile"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const users = await Profile.find(req.query);
                res.status(200).json({ success: true, data: users });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        case 'POST':
            try {
                await Profile.findByIdAndUpdate(req.query._id, req.body);

                res.status(200).json({ success: true });
                
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break

        case 'DELETE':
            try {
                await Profile.findByIdAndDelete(req.query._id);
                
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}
