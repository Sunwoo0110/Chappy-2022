import axios from "../../../../../lib/api";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try{
                const startDay = req.query.start_day
                let week = 1;

                const weekResponse = await axios({
                    method: 'get',
                    url: '/api/aggregation/lecture/getweek',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        'start_day': startDay,
                    }
                })
                if (weekResponse.data?.success !== true) {
                    res.status(400).json({success: false, error: "weekResponse error"});
                } 
                else {
                    week = weekResponse.data.data;
                }                    

                let submissionBody = {
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: [
                                                '$lecture_id' , 
                                                { $toObjectId: req.query.lecture_id } 
                                            ] 
                                        },
                                        {
                                            $eq: [
                                                '$user_id',
                                                { $toObjectId: req.query.user_id}
                                            ]
                                        }
                                    ]
                                },
                                type: 0,
                                submission_state: 1,
                            }
                        },
                        {
                            $project: {
                                _id:0,
                                ref_id:1,
                            }
                        },
                    ]
                }
                const submissions = await axios({
                    method: 'post',
                    url: '/api/submission/submission/aggregate',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: submissionBody
                })

                const submissionRefIds = await Promise.all(submissions.data.data.map( async (submission)=>{
                    return submission.ref_id;
                }));

                let assignmentBody = {
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: [
                                                '$lecture_id' , 
                                                { $toObjectId: req.query.lecture_id } 
                                            ] 
                                        },
                                        {
                                            $not: {
                                                $in: [
                                                    '$_id', 
                                                    { 
                                                        $map: {
                                                            input: submissionRefIds,
                                                            in: { $toObjectId: '$$this' }
                                                        } 
                                                    }
                                                ]
                                            }                                            
                                        }
                                    ]
                                },
                                type: 0,
                                weeks: week,
                                is_opened: true,
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                title: 1,
                                open_at: 1,
                                closing_at: 1,
                                weeks:1
                            }
                        },
                        {
                            $sort: {
                                closing_at: -1
                            }
                        }
                    ]
                }
                const assignments = await axios({
                    method: 'post',
                    url: '/api/lecture/assignment/aggregate',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: assignmentBody
                });

                res.status(200).json({success: true, data: assignments.data.data})

            } catch (error) {
                res.status(400).json({success: false, error: error})
            }
            break

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}
