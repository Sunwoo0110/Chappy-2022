import dbConnect from "../../../../lib/dbConnect";
import Profile from "../../../../models/user/Profile";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch(method) {
        case 'POST':
            try{
                const user = await Profile.find({
                    "user_id": req.body.id,
                    "password": req.body.pwd,
                });

                if(user.length==1){
                    const user_id = user[0]._id.toString();
                    res.status(200).json({succes: true, id: user_id, type: user[0].type});
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
