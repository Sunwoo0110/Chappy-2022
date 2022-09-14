/** /pages/api/lecture/[id].js **/
import dbConnect from "../../../../../lib/dbConnect"
import Submission from "../../../../../models/submission/Submission"
import Objection from "../../../../../models/submission/Objection"


export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                console.log("?req.query: ",req.query)
                const submissions = await Submission.find({
                    "lecture_id":req.query.lecture_id,
                    "user_id":req.query.user_id, 
                });

                var subID = [];
                for (let sub of submissions){
                    subID.push(sub._id);
                }

                var objections = [];
                let obj;

                for (let id of subID){
                    obj = await Objection.findOne({"submission_id":id});
                    if (obj !== null) objections.push(obj);
                }
                // console.log("objections[0].date: ",objections[0].date.getFullYear(),".",objections[0].date.getMonth()+1,".",objections[0].date.getDate())
                res.status(200).json({ success: true, objections: objections });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}