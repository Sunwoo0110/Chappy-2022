/** /pages/api/lecture/[id].js **/
import dbConnect from "../../../../lib/dbConnect"
import Profile from "../../../../models/user/Profile"

export default async function handler(req, res) {
    const { method } = req;

    console.log("user api");
    await dbConnect();

    console.log("user api");

    switch (method) {
        case 'GET':
            try {
                const user = await Profile.findById(req.query.user_id);
                res.status(200).json({ success: true, user: user });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        case 'POST':
            try {
                const user = await Profile.findById(req.query.user_id);

                await Profile.findByIdAndUpdate(req.query.user_id, req.body);

                res.status(200).json({ success: true });
                
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break

        case 'DELETE':
            try {
                const user = await Profile.findById(req.query.user_id);

                await Profile.findByIdAndDelete(req.query.user_id);
                
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