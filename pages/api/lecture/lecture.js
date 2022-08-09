/** /pages/api/lecture/lecture.js **/
import dbConnect from "../../../lib/dbConnect"
import Lecture from "../../../models/Lecture"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const lectures = await Lecture.find({});
                res.status(200).json({ success: true, lectures: lectures });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        case 'PUT':
            try {
                // var type = req.body.type;
                // console.log(type)
                const lectures = await Lecture.find( { name : {$regex : req.body.name}});
                res.status(200).json({ success: true, lectures: lectures });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        case 'POST':
            try {
                
                Lecture.create({
                    name: req.body.name,
                    professor: req.body.professor,
                    classnumber: req.body.classnumber,
                    open: req.body.open
                });

                const lectures = await Lecture.find({});
                res.status(200).json({ success: true, lectures: lectures });
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break

        case 'DELETE':
            try {
                const result = await Lecture.findByIdAndDelete(req.body.lecture_id)
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