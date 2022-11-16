
import dbConnect from "../../../../lib/dbConnect"

import axios from "../../../../lib/api";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();    

    switch (method) {
        case 'GET':
            try {
                const lecture = await axios.get('/api/lecture/info', {
                    params: {
                        _id: req.query.lecture_id,
                    }
                });

                const assignments = await axios.get('/api/lecture/assignment', {
                    params: {
                        lecture_id: req.query.lecture_id,
                        type: 0, //과제
                        is_ready: true, //임시저장 제외하기 위한 조건
                    }
                });
                var assignmentsID = await Promise.all(assignments.data.data.map( async (assignment) => {
                    return assignment._id;
                }))
                // console.log("assignmentsID: ", assignmentsID)

                var latest_sub =[];
                for(let assignment of assignments.data.data){
                    let submissions = await axios.get('/api/submission/submission', {
                        params: {
                            user_id: req.query.user_id,
                            ref_id: assignment._id,
                            submission_state: 1,
                        }
                    });
                    if(submissions.data.data.length>0){
                        let min = submissions.data.data[0]
                        var findLatest = await Promise.all(submissions.data.data.map( async (submission) => {
                            if (submission.submission_date > min.submission_date ) {
                                min = submission
                            }
                            return submission._id;
                        }))
                        min["title"]=assignment.title;
                        latest_sub.push(min);
                    }
                }
                var subID = await Promise.all(latest_sub.map( async (s) => { return s._id; }))

                let grades = await axios.get('/api/submission/grade', {
                    params: {
                        submission_id: {$in: subID},
                    }
                });

                let mygrade = [];
                for(let sub of latest_sub){
                    let g = {};

                    let d= new Date(sub.submission_date);
                    g["date"] = d.getFullYear()+"."+d.getMonth()+"."+d.getDate();
                    g["title"] = sub.title;
                    g["professor"] = lecture.data.data[0].professor;
                    let grade=grades.data.data.find(g=>g.submission_id===sub._id)
                    if(grade==undefined){
                        g["state"] = "채점 중";
                        g["grade"] = "---";
                    }
                    else{
                        g["state"] = "채점 완료";
                        g["grade"] = grade.total_score;
                    }

                    mygrade.push(g);                    
                }

                // console.log("mygrade2: ",mygrade)
                res.status(200).json({ success: true, data: mygrade });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}