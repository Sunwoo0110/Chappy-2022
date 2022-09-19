import dbConnect from "../../../../lib/dbConnect"
import Assignment from "../../../../models/lecture/Assignment"
import qs from "qs";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'POST':
            try {
                console.log("=============================");
                // console.log(query);
                // let query = qs.parse(req.query);
                console.log(req.body);
                console.log(req.body.pipeline[0].$match.lecture_id);
                let body = qs.parse(req.body);
                // console.log(body);
                // console.log(typeof(body));
                console.log(body.pipeline);
                // console.log(req.body.pipeline);
                // res.status(200).json({ success: true, data: "hello" });
                console.log((Array.isArray(body.pipeline)));

                let test = [
                    {
                        $match: {
                            // lecture_id: '62ffbe814b99ac8a2bcbd018',
                            is_opened: true,
                        }
                    },
                    {
                        "$project": {
                            "_id": 0,
                            "weeks": 1,
                        }
                    },
                    {
                        "$sort": {
                            "weeks": -1,
                        }
                    },
                    {
                        "$limit": 1
                    }
                ];
                console.log(test);
                console.log(Array.isArray(test));
                console.log(test[0]);
                // const assignments = await Assignment.aggregate([
                //     {
                //         $match: {
                //             // lecture_id: "62ffbe814b99ac8a2bcbd018",
                //             is_opened: true,
                //         }
                //     },
                // ]);
                // const assignments = await Assignment.aggregate(test);
                const assignments = await Assignment.aggregate(req.body.pipeline);
                console.log("jejeheheh===\n", assignments);
                res.status(200).json({ success: true, data: assignments });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}
