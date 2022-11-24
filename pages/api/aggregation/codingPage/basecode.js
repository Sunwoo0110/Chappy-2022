
import dbConnect from "../../../../lib/dbConnect"

import axios from "../../../../lib/api";
const mongoose = require('mongoose');

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();    

    switch (method) {
        case 'GET':
            try {
                const submissions = await axios.get('api/submission/submission', {
                    params: {
                        user_id: req.query.user_id,
                        ref_id: req.query.assignment_id
                    }
                })

                const assignment = await axios.get('api/lecture/assignment', {
                    params: {
                        _id: req.query.assignment_id
                    }
                })
                
                var submissionID = await Promise.all(submissions.data.data.map( async (submission) => {
                    return submission._id;
                }))

                var basecode = ''
                var min = submissions.data.data[0]

                var findLatest = await Promise.all(submissions.data.data.map( async (submission) => {
                    if (submission.submission_date > min.submission_date ) {
                        min = submission
                    }
                    return submission._id;
                }))
                
                if (submissionID.length === 0) {
                    basecode = assignment.data.data[0].base_code
                } else {
                    // basecode = latestSub.data.data[0].user_code
                    basecode = min.user_code
                }

                console.log("basecode: " + assignment.data.data[0].base_code)

                res.status(200).json({ success: true, data: basecode });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}