import axios from "../../../../../lib/api";
import qs from "qs";
import moment from 'moment';

const mongoose = require('mongoose');

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try{
                console.log("-------------");

                const config = {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }

                // const date = moment('00:00:00','HH:mm:ss');
                // const todayDate = date.toISOString();

                // let payload = qs.stringify({
                //     pipeline: [
                //         { 
                //             $match: {
                //                 lecture_id: req.query.lecture_id,
                //                 is_openend: true,
                //             }
                //         },
                //         {
                //             $group: {
                //                 _id: "$_id",
                //                 weeks: "$weeks",
                //             }
                //         },
                //         {
                //             $sort: {
                //                 weeks: -1,
                //             }
                //         },
                //     ]
                // });
                let lectureObjectId = mongoose.Types.ObjectId(req.query.lecture_id);

                let bodyData = {
                    pipeline: [
                        {
                            $match: {
                                $expr : { $eq: [ '$lecture_id' , { $toObjectId: req.query.lecture_id } ] },
                                is_opened: false,
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                weeks: 1,
                            }
                        },
                        {
                            $sort: {
                                weeks: -1,
                            }
                        },
                        {
                            $limit: 1
                        }
                    ]
                };

                const testBody = new URLSearchParams(bodyData);
                console.log("testbody\n", testBody);

                let payload = qs.stringify(bodyData, {
                    // arrayFormat: "brackets",
                    // encode: true,
                    // indices: true,
                });
                console.log(bodyData.pipeline);
                console.log(bodyData.pipeline[0].$match.lecture_id);
                // console.log(payload);
                
                const assignment_weeks = await axios({
                    method: 'post',
                    url: '/api/lecture/assignment/aggregate',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: bodyData
                });
                // const assignment_weeks = await axios.post('/api/lecture/assignment/aggregate',
                //     testBody, config 
                // );
                // console.log(assignment_weeks);

                res.status(200).json({success: true, data: assignment_weeks.data.data});

            } catch (error) {
                res.status(400).json({success: false, error: error})
            }
            break

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}

