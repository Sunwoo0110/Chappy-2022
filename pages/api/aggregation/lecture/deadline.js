
import dbConnect from "../../../../lib/dbConnect"

import axios from "../../../../lib/api";


export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();   
    switch (method) {
        case 'GET':
            try {
                // 유저 제출물 조회
                const users = await axios.get('/api/user/profile', {
                    params: {
                        _id: req.query.user_id,
                    }
                });
                let lectures=users.data.data[0].lecture_list;

                // 과제 조회
                const assignments = await axios.get('/api/lecture/assignment', {
                    params: {
                        lecture_id: {$in: lectures},
                        is_ready: true, //임시저장 제외하기 위한 조건
                        type: 0, //과제
                        closing_at:{$gte : new Date()} //오늘(포함) 이후 마감
                    }
                });

                // 과제 id 리스트
                var assignmentsID = await Promise.all(assignments.data.data.map( async (assignment) => {
                    return assignment._id;
                }))

                let deadlines = [];

                // 과제 데이터 정리: 과제 제목, 마감일, 과제 id
                for(let assignment of assignments.data.data){
                    let deadline = {};
                    deadline["title"] = assignment.title;
                    let d= new Date(assignment.closing_at);
                    deadline["closing_at"] = new Date(assignment.closing_at);
                    deadline["date"] = (d.getMonth()+1)+"/"+d.getDate()+" "+d.getHours()+":"+d.getMinutes();
                    deadline["assignment_id"] = assignment._id;
                    deadlines.push(deadline);                    
                }
                // 과제 마감일 오름차순 정렬
                deadlines.sort(function(a, b) {                    
                    if(a.closing_at > b.closing_at) return 1;
                    if(a.closing_at < b.closing_at) return -1;
                    if(a.closing_at === b.closing_at) return 0;
                });

                res.status(200).json({ success: true, data: deadlines });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}