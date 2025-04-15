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
                
                // 현재 주차에 해당하는 수업 조회
                const lessons = await axios.get('/api/lecture/lesson', {
                    params: {
                        lecture_id: req.query.lecture_id, 
                        type: 0,
                        weeks: week,
                    }
                });

                const lesson_ids = await Promise.all(lessons.data.data.map( async (lesson) => {
                    return lesson._id;
                }));

                // 수업 ID에 해당하는 출석 정보 조회
                const attendances = await axios.get('/api/lecture/attendance', {
                    params: {
                        lesson_id: {$in: lesson_ids},
                        $addFields : { "__order" : { "$indexOfArray" : [ lesson_ids, "$id" ] } },
                        $sort: { "__order" : 1 }, 
                    }    
                })

                // 수업 ID에 해당하는 출석 정보에서 유저 ID에 해당하는 출석 정보만 추출
                let attendancInfoLessons = [];
                for(let i=0; i<lesson_ids.length; i++){
                    let attendancePerLesson = {};
                    attendancePerLesson["lesson"] = lessons.data.data[i];
                    attendancePerLesson["attendance"] = attendances.data.data[i].attendance[req.query.user_id];
                    attendancInfoLessons.push(attendancePerLesson);
                }
                res.status(200).json({success: true, data: attendancInfoLessons})

            } catch (error) {
                if(error.name=="CastError")
                    res.status(200).json({success: true, data: -1})            
                res.status(400).json({success: false, error: error})
            }
            break

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}
