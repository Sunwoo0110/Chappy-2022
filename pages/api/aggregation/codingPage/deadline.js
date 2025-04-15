import dbConnect from "../../../../lib/dbConnect"

import axios from "../../../../lib/api";
const mongoose = require('mongoose');

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();    

    switch (method) {
        case 'GET':
            try {
                // 과제 제출물 조회
                const assignment = await axios.get('api/lecture/assignment', {
                    params: {
                        _id: req.query.assignment_id
                    }
                })

                const now = new Date();
                var close  = false;
                
                // 과제 마감일이 현재 시간보다 이전이면 마감 상태로 판단
                if (new Date(assignment.data.data[0].closing_at) >= now) {
                    close = false;
                } else {
                    close = true;
                }

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