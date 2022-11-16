import dbConnect from "../../../../lib/dbConnect";

import axios from "../../../../lib/api";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch(method) {
        case 'POST':
            try{
                let userBody = {
                    name: req.body.name,
                    user_id: req.body.user_id,
                    pwd: req.body.pwd,
                    email: req.body.email,
                    cell_number: req.body.cell_number,
                    department: req.body.department,
                    semester: req.body.semester,
                    type: req.body.type,
                }
                // console.log(req.body)

                const user = await axios.post('api/user/profile', {
                    data: {
                        name: req.body.name,
                        user_id: req.body.user_id,
                        pwd: req.body.pwd,
                        email: req.body.email,
                        cell_number: req.body.cell_number,
                        department: req.body.department,
                        semester: req.body.semester,
                        type: req.body.type,
                    }
                })
                console.log(user.data)

                res.status(200).json({success: true, data: user.data.data });

            } catch (error) {
                console.log("error");
                res.status(400).json({success: false, error: error})
            }
            break

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }

}
