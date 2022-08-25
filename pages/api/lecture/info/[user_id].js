/** /pages/api/lecture/[id].js **/
import dbConnect from "../../../../lib/dbConnect"
import Info from "../../../../models/lecture/Info"
import Profile from "../../../../models/user/Profile"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                
                const user = await Profile.findById(req.query.user_id);
                var lecID = user.lecture_list;
                var lectures = [];
                let lec;
                
                for (let id of lecID){
                    lec = await Info.findById(id);
                    lectures.push(lec);
                }

                res.status(200).json({ success: true, lectures: lectures });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        case 'POST':
            try {
                console.log('add:', req.body.lecture_id);
                const user = await Profile.findById(req.query.user_id);
                var lecID = user.lectures;

                let newID = lecID.filter((e) => e === req.body.lecture_id);

                if (newID.length > 0) {
                    res.status(200).json({ success: false });
                } else {
                    lecID.push(req.body.lecture_id);

                    const newUser = await Profile.findByIdAndUpdate(req.query.user_id, { "lectures": lecID }, {
                        new: true, 
                    });

                    res.status(200).json({ success: true, lectures: newUser.lectures });
                }

                
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break

        case 'DELETE':
            try {
                console.log('delete:', req.body.lecture_id);
                const id = req.body.lecture_id;
                const user = await Profile.findById(req.query.user_id);

                let lecID = user.lectures;
                let newlectures = lecID.filter((e) => e !== id);

                const newUser = await Profile.findByIdAndUpdate(req.query.user_id, { "lectures": newlectures }, {
                    new: true, 
                });

                console.log(newUser)
                
                res.status(201).json({ success: true, lectures: newUser.lectures })
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}