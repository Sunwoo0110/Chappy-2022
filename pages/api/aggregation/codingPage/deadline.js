import dbConnect from "../../../../lib/dbConnect"

import axios from "../../../../lib/api";
const mongoose = require('mongoose');

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();    

    switch (method) {
        case 'GET':
            try {
                const assignment = await axios.get('api/lecture/assignment', {
                    params: {
                        _id: req.query.assignment_id
                    }
                })

                const now = new Date();
                var close  = false;

                if (new Date(assignment.data.data[0].closing_at) >= now) {
                    close = false;
                } else {
                    close = true;
                }

                // console.log("now: " + now)
                // console.log("assignment.closing_at: " + assignment.data.data[0].closing_at)

                res.status(200).json({ success: true, data: close});
                
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}