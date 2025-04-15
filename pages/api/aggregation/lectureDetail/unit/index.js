import axios from "../../../../../lib/api";
import moment from 'moment';

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try{
                const date = moment();
                const todayDate = date.toISOString();                

                // 지난 공개된 과제를 주차별로 그룹화
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
                                _id: "$weeks", // 주차별
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

                // 지난 공개된 강의 주차별로 그룹화
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
                                _id: "$weeks", // 주차별
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

                // 과제와 강의 주차 중 가장 큰 주차를 선택
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

                // 과제와 강의 주차별로 데이터를 합침
                let unitData = [];
                for (let i=1; i<=week; i++){
                    let perWeekData = {};

                    // 해당 주차에 과제가 있는 경우 병합
                    for (let x=0; x<assignmentWeekLen; x++){
                        if(assignmentData[x]._id === i){
                            Object.assign(perWeekData, assignmentData[x]);
                            break;
                        }
                    }

                    // 해당 주차에 강의가 있는 경우 병합
                    for (let y=0; y<lessonWeekLen; y++){
                        if(lessonData[y]._id === i){
                            Object.assign(perWeekData, lessonData[y]);
                            break;
                        }
                    }
                    unitData = [ ...unitData, {...perWeekData}]
                }
                
                // 주차별 수업 및 과제 목록
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

