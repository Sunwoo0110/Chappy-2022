import axios from "../../../../../lib/api";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try{
                // 유저 제출물 중 조건에 맞는 과제 ID 조회
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
                                _id: 0,
                                ref_id: 1,
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
                // 유저 제출물 중 ref_id만 추출
                const submissionRefIds = await Promise.all(submissions.data.data.map( async (submission)=>{
                    return submission.ref_id;
                }));

                // 제출 과제 중 공개한 과제 목록 조회
                let assignmentBody = {
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: [
                                        '$_id', 
                                        { 
                                            $map: {
                                                input: submissionRefIds,
                                                in: { $toObjectId: '$$this' }
                                            } 
                                        }
                                    ]
                                },                                            
                                is_opened: true, // 과제 공개 여부
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                title: 1, // 과제 제목
                            }
                        },
                        {
                            $sort: {
                                open_at: -1 // 최신 순
                            }
                        },
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

                res.status(200).json({success: true, data: assignments.data.data});

            } catch (error) {     
                res.status(400).json({success: false, error: error})
            }
            break

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}
