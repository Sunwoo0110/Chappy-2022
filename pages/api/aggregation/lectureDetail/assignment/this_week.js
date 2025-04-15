import axios from "../../../../../lib/api";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try{
                const startDay = req.query.start_day
                let week = 1;

                // 현재 주차 반환
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
                // 제출 완료한 과제 ID 조회
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
                                type: 0, // 과제
                                submission_state: 1, // 제출 완료
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

                // 제출한 과제 ID만 추출
                const submissionRefIds = await Promise.all(submissions.data.data.map( async (submission)=>{
                    return submission.ref_id;
                }));

                // 제출하지 않은 이번 주 과제
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
                                type: 0, // 과제
                                weeks: week, // 이번 주 과제만
                                is_opened: true, // 공개된 과제
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
                                closing_at: -1 // 마감일 기준 내림차순
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

                // 아직 제출하지 않은 과제 목록
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
