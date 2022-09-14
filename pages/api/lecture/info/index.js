import dbConnect from "../../../../lib/dbConnect"
import Info from "../../../../models/lecture/Info"
import qs from "qs";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                let query = qs.parse(req.query);
                const lectures = await Info.find(query);
                console.log("req.query: ",query);
                console.log("lectures: ",lectures);
                res.status(200).json({ success: true, data: lectures });
                
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        case 'POST':
            try {
                // console.log('add:', req.body);
                // const user = await Profile.findById(query.user_id);
                // var lecID = user.lectures;

                // let newID = lecID.filter((e) => e === req.body.lecture_id);

                // if (newID.length > 0) {
                //     res.status(200).json({ success: false });
                // } else {
                //     lecID.push(req.body.lecture_id);

                //     const newUser = await Profile.findByIdAndUpdate(req.query.user_id, { "lectures": lecID }, {
                //         new: true, 
                //     });

                //     res.status(200).json({ success: true, lectures: newUser.lectures });
                // }
                const lecture=new Info(req.body);
                lecture.save()
                .then(()=>{
                    console.log("success lecture adding");
                })
                .catch((err)=>{
                    console.log("lecture adding failed: ", err);
                });
                res.status(200).json({ success: true });
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}