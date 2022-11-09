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
                            $group: {
                                _id: "$weeks",
                                assignments: {$addToSet: "$_id"},
                            }
                        },
                        {
                            $sort: {
                                _id: 1,
                            }
                        },
                    ]
                };
                const assignmentResponse = await axios({
                    method: 'post',
                    url: '/api/lecture/assignment/aggregate',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: assignmentBody
                });
                const assignmentData = assignmentResponse.data.data;


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
                            $group: {
                                _id: "$weeks",
                                lessons: {$addToSet: "$_id"},
                            }
                        },
                        {
                            $sort: {
                                _id: 1,
                            }
                        },                    
                    ]
                };
                const lessonResponse = await axios({
                    method: 'post',
                    url: '/api/lecture/lesson/aggregate',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: lessonBody
                });
                const lessonData = lessonResponse.data.data;

                let assignmentWeek=0;
                let lessonWeek=0;
                let week = 0;

                let assignmentWeekLen = assignmentData.length;
                let lessonWeekLen = lessonData.length;
                if(assignmentWeekLen!=0){
                    assignmentWeek = assignmentData[assignmentWeekLen-1]._id;
                }
                if(lessonWeekLen!=0)
                    lessonWeek = lessonData[lessonWeekLen-1]._id;    

                if(lessonWeek >= assignmentWeek)
                    week = lessonWeek;
                else
                    week = assignmentWeek;

                let unitData = [];
                for (let i=1; i<=week; i++){
                    let perWeekData = {};
                    for (let x=0; x<assignmentWeekLen; x++){
                        if(assignmentData[x]._id === i){
                            Object.assign(perWeekData, assignmentData[x]);
                            break;
                        }
                    }
                    for (let y=0; y<lessonWeekLen; y++){
                        if(lessonData[y]._id === i){
                            Object.assign(perWeekData, lessonData[y]);
                            break;
                        }
                    }
                    unitData = [ ...unitData, {...perWeekData}]
                }
                
                res.status(200).json({success: true, data: unitData});

            } catch (error) {
                res.status(400).json({success: false, error: error})
            }
            break

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}

