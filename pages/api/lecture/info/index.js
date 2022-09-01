import dbConnect from "../../../../lib/dbConnect"
import Info from "../../../../models/lecture/Info"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const lectures = await Info.find(req.query);
                res.status(200).json({ success: true, data: lectures });
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

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}