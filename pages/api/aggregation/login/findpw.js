import dbConnect from "../../../../lib/dbConnect";
import Profile from "../../../../models/user/Profile";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch(method) {
        case 'POST':
            try{
                const user = await Profile.find({
                    "user_id": req.body.user_id,
                    "email": req.body.email,
                });

                if(user.length==1){
                    const password = user[0].password.toString();
                    res.status(200).json({succes: true, data: password});
                }
                else{
                    res.status(200).json({succes: true, data: -1})
                }
            } catch (error) {
                console.log("333");
                res.status(400).json({success: false, error: error})
            }
            break

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }

}
