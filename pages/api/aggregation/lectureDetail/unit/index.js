import axios from "../../../../../lib/api";
import moment from 'moment';

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try{
                const date = moment();
                const todayDate = date.toISOString();                

                let assignmentBody = {
                    pipeline: [
                        {
                            $match: {
                                $expr : {
                                    $and: [
                                        {
                                            $eq: [
                                                    '$lecture_id' , 
                                                    { $toObjectId: req.query.lecture_id } 
                                            ] 
                                        },
                                        {
                                            $lte: [
                                                    '$open_at' , 
                                                    { $toDate: todayDate } 
                                            ] 
                                        }
                                    ] 
                                },
                                is_ready: true,
                            }
                        },
                        {
                            $project: {
                                _id: 0,
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
                
                let lessonBody = {
                    pipeline: [
                        {
                            $match: {
                                $expr : {
                                    $and: [
                                        {
                                            $eq: [
                                                    '$lecture_id' , 
                                                    { $toObjectId: req.query.lecture_id } 
                                            ] 
                                        },
                                        {
                                            $lte: [
                                                    '$open_at' , 
                                                    { $toDate: todayDate } 
                                            ] 
                                        }
                                    ] 
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
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

                const assignment_weeks = await axios({
                    method: 'post',
                    url: '/api/lecture/assignment/aggregate',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: assignmentBody
                });

                const lesson_weeks = await axios({
                    method: 'post',
                    url: '/api/lecture/lesson/aggregate',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: lessonBody
                });

                let assignment_week=0;
                let lesson_week=0;
                let week = 0;

                if(assignment_weeks.data.data.length!=0){
                    assignment_week = assignment_weeks.data.data[0].weeks;
                }

                if(lesson_weeks.data.data.length!=0)
                    lesson_week = lesson_weeks.data.data[0].weeks;
    
                if(lesson_week >= assignment_week)
                    week = lesson_week;
                else
                    week = assignment_week;

                let week_list = [];
                for(let i=1; i<=week; i++)
                    week_list.push(i);

                res.status(200).json({success: true, data: {unit_id: week_list}});

            } catch (error) {
                res.status(400).json({success: false, error: error})
            }
            break

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}

