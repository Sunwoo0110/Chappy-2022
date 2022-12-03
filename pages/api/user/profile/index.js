import dbConnect from "../../../../lib/dbConnect"
import Profile from "../../../../models/user/Profile"
import qs from "qs";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                let query = qs.parse(req.query);
                const users = await Profile.find(query);
                res.status(200).json({ success: true, data: users });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        case 'POST':
            try {
                console.log(req.body) 
                // console.log(req.body.data)
                // name: req.body.data.name,
                // user_id: req.body.data.user_id,
                // password: req.body.data.password,
                // email: req.body.data.email,
                // cell_number: req.body.data.cell_number,
                // department: req.body.data.department,
                // semester: req.body.data.semester,
                // type: req.body.data.type,
                const user = await Profile.create(req.body.data);
                res.status(200).json({ success: true, data: user })
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break;

        case 'PATCH':
            try {
                console.log("*req.query._id: ", req.query._id)
                console.log("*req.body: ", req.body)
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
