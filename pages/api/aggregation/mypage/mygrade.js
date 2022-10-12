
import dbConnect from "../../../../lib/dbConnect"

import axios from "../../../../lib/api";


export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();    

    switch (method) {
        case 'GET':
            try {
                const users = await axios.get('/api/user/profile', {
                    params: {
                        _id: req.query.user_id,
                    }
                });
                var lecID = users.data.data[0].lecture_list;
                // console.log("lecID: ", lecID)

                const grades = await axios.get('/api/user/grade', {
                    params: {
                        user_id: req.query.user_id,
                    }
                });
                // console.log("req.query.user_id: ", req.query.user_id)
                // console.log("grades.data.data: ", grades.data.data)

                const lectures = await axios.get('/api/lecture/info', {
                    params: {
                        _id: {$in: lecID},
                        is_ready: true, //임시저장 제외하기 위한 조건
                    }
                });
                // console.log("lectures: ", lectures.data.data)

                let x_semesters=[];

                for(let lec of lectures.data.data){
                    if(!x_semesters.includes(lec.open_semester)){
                        x_semesters.push(lec.open_semester);
                    }
                }
                x_semesters.sort();
                // console.log("x_semesters: ", x_semesters);

                var y_grades=new Array(x_semesters.length);
                y_grades.fill(0);
                // console.log("y_grades: ", y_grades);

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
                // console.log("y_grades: ", y_grades);

                let grade = {};
                grade["total"] = total_grade/total_credit;
                grade["this_semester"] = y_grades[x_semesters.indexOf(req.query.semester)];
                grade["semesters"] = x_semesters;
                grade["grades"] = y_grades;

                // console.log("grade: ",grade)
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