
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

                //계획된 시험
                const exams = await axios.get('/api/lecture/assignment', {
                    params: {
                        lecture_id: lecture.data.data[0]._id,
                        type: {$in:[1,2,3]}, //시험, 퀴즈
                        is_ready: true, //임시저장 제외하기 위한 조건
                    }
                });
                //진행된 시험
                let today= new Date();
                let done_exam=[];
                for(let exam of exams.data.data){
                    if(new Date(exam.closing_at)<today){
                        done_exam.push(exam._id);
                    }
                }
                //놓친시험
                let exam_submissions=[];
                if(done_exam.length!==0){
                    exam_submissions = await axios.get('/api/submission/submission', {
                        params: {
                            ref_id: {$in: done_exam},
                            user_id: req.query.user_id,
                            submission_state: 1,
                        }
                    });
                    exam_submissions=exam_submissions.data.data;
                }
                // console.log("exam_submissions: ",exam_submissions)

                //과제
                const assignments = await axios.get('/api/lecture/assignment', {
                    params: {
                        lecture_id: lecture.data.data[0]._id,
                        type: 0, //과제
                        is_ready: true, //임시저장 제외하기 위한 조건
                    }
                });
                var assignmentsID = await Promise.all(assignments.data.data.map( async (assignment) => {
                    return assignment._id;
                }))
                // console.log("assignmentsID: ", assignmentsID)

                const submissions = await axios.get('/api/submission/submission', {
                    params: {
                        ref_id: {$in: assignmentsID},
                        user_id: req.query.user_id,
                        submission_state: 1,
                    }
                });
                const submissionsRef = await Promise.all(submissions.data.data.map( async (submission) => {
                    return submission.ref_id;
                }))

                let missed=0;
                for(let assignment of assignmentsID){
                    if(!submissionsRef.includes(assignment)){
                        missed+=1;
                    }
                }
                // console.log("assignmentsID.length, missed: ",assignmentsID.length,missed)

                //중간고사
                let midterm_state="";
                const midterm = await axios.get('/api/lecture/assignment', {
                    params: {
                        lecture_id: lecture.data.data[0]._id,
                        type: 2,
                        is_ready: true, //임시저장 제외하기 위한 조건
                    }
                });
                if(midterm.data.data.length==0
                    ||new Date(midterm.data.data[0].closing_at)>today){
                    midterm_state="미진행"
                }
                else{
                    let sub = await axios.get('/api/submission/submission', {
                        params: {
                            ref_id: midterm.data.data[0]._id,
                            user_id: req.query.user_id,
                            submission_state: 1,
                        }
                    });

                    // console.log("sub.data.data: ",sub.data.data)
                    var latest_sub = sub.data.data[0];
                    var findLatest = await Promise.all(sub.data.data.map( async (submission) => {
                        if (submission.submission_date > latest_sub.submission_date ) {
                            latest_sub = submission
                        }
                        return submission._id;
                    }))

                    let grade = await axios.get('/api/submission/grade', {
                        params: {
                            submission_id: latest_sub._id,
                        }
                    });

                    if(grade.data.data.length==0){
                        midterm_state="채점 중"
                    }
                    else{
                        midterm_state=grade.data.data[0].total_score+"점"
                    }
                }

                //기말고사
                let endterm_state="";
                const endterm = await axios.get('/api/lecture/assignment', {
                    params: {
                        lecture_id: lecture.data.data[0]._id,
                        type: 3,
                        is_ready: true, //임시저장 제외하기 위한 조건
                    }
                });
                if(endterm.data.data.length==0
                    ||new Date(endterm.data.data[0].closing_at)>today){
                    endterm_state="미진행"
                }
                else{
                    let sub = await axios.get('/api/submission/submission', {
                        params: {
                            ref_id: endterm.data.data[0]._id,
                            user_id: req.query.user_id,
                            submission_state: 1,
                        }
                    });

                    // console.log("sub.data.data: ",sub.data.data)
                    var latest_sub = sub.data.data[0];
                    var findLatest = await Promise.all(sub.data.data.map( async (submission) => {
                        if (submission.submission_date > latest_sub.submission_date ) {
                            latest_sub = submission
                        }
                        return submission._id;
                    }))
                    
                    let grade = await axios.get('/api/submission/grade', {
                        params: {
                            submission_id: latest_sub._id,
                        }
                    });

                    if(grade.data.data.length==0){
                        endterm_state="채점 중"
                    }
                    else{
                        endterm_state=grade.data.data[0].total_score+"점"
                    }
                }

                let mygrade = {};
                mygrade["lecture_name"] = lecture.data.data[0].name;
                mygrade["exam"] = exams.data.data.length;
                mygrade["done_exam"] = done_exam.length;
                mygrade["missed_exam"] = done_exam.length-exam_submissions.length;
                if(assignmentsID.length==0){
                    mygrade["assignment"] = 0;
                }
                else{
                    mygrade["assignment"] = (assignmentsID.length-missed)/assignmentsID.length*100;
                }
                mygrade["midterm"] = midterm_state;
                mygrade["endterm"] = endterm_state;

                // console.log("mygrade: ",mygrade)
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