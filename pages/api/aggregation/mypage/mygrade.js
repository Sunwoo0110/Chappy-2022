
import dbConnect from "../../../../lib/dbConnect"

import axios from "../../../../lib/api";


export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();    

    switch (method) {
        case 'GET':
            try {
                // 유저가 수강중인 강의 목록 조회
                const users = await axios.get('/api/user/profile', {
                    params: {
                        _id: req.query.user_id,
                    }
                });
                var lecID = users.data.data[0].lecture_list;

                // 유저 전체 성적 정보
                const grades = await axios.get('/api/user/grade', {
                    params: {
                        user_id: req.query.user_id,
                    }
                });

                // 유저가 수강중인 강의 목록 조회
                const lectures = await axios.get('/api/lecture/info', {
                    params: {
                        _id: {$in: lecID},
                        is_ready: true, //임시저장 제외하기 위한 조건
                    }
                });

                // 학기 목록
                let x_semesters=[];

                for(let lec of lectures.data.data){
                    if(!x_semesters.includes(lec.open_semester)){
                        x_semesters.push(lec.open_semester);
                    }
                }
                x_semesters.sort();
                
                // 학기 별 성적
                var y_grades=new Array(x_semesters.length);
                y_grades.fill(0);

                let total_credit=0;
                let total_grade=0;

                for(let sem of x_semesters){
                    let credit=0;
                    for(let g of grades.data.data){
                        let ref_lecture;
                        for(let l of lectures.data.data){
                            if(l._id===g.lecture_id){
                                ref_lecture=l;
                            }
                        }
                        if(ref_lecture.open_semester===sem){
                            total_credit+=1;
                            total_grade+=g.grade*1;
                            credit+=1;//학점 더해주기로 수정
                            y_grades[x_semesters.indexOf(sem)]+=g.grade*1; //학점 곱해주기로 수정
                        }
                    }
                    y_grades[x_semesters.indexOf(sem)]/=credit;
                }
                
                // 최종 성적 결과
                let grade = {};
                grade["total"] = total_grade/total_credit;
                grade["this_semester"] = y_grades[x_semesters.indexOf(req.query.semester)];
                grade["semesters"] = x_semesters;
                grade["grades"] = y_grades;

                res.status(200).json({ success: true, data: grade});
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}