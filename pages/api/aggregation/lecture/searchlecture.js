
import dbConnect from "../../../../lib/dbConnect"

import axios from "../../../../lib/api";


export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();    

    switch (method) {
        case 'POST':
            try {
                let cnt=0;
                let userDataBody = {
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        '$_id',
                                        { $toObjectId: req.body.user_id}
                                    ]
                                },
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                lecture_list: 1,
                            }
                        },
                    ]
                }
                const users = await axios({
                    method: 'post',
                    url: '/api/user/profile/aggregate',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: userDataBody
                })
                var lecID = users.data.data[0].lecture_list;
                if(!lecID.includes(req.body.lecture_id)){
                    lecID.push(req.body.lecture_id);
                    await axios({
                        method: 'post',
                        url: '/api/user/profile',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params:{_id: req.body.user_id},
                        data: {lecture_list: lecID}
                    })
                }
                else{
                    cnt++;
                }


                let lectureDataBody = {
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        '$_id',
                                        { $toObjectId: req.body.lecture_id}
                                    ]
                                },
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                user_list: 1,
                            }
                        },
                    ]
                }
                const lectures = await axios({
                    method: 'post',
                    url: '/api/lecture/info/aggregate',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: lectureDataBody
                })
                var userID = lectures.data.data[0].user_list;
                if(!userID.includes(req.body.user_id)){
                    userID.push(req.body.user_id);
                    await axios({
                        method: 'post',
                        url: '/api/lecture/info',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params:{_id: req.body.lecture_id},
                        data: {user_list: userID}
                    })
                }
                else{
                    cnt++;
                } 

                let msg="강의를 담았습니다."               
                if(cnt===2){
                    msg="이미 담은 강의입니다."
                }
                console.log("msg: ",msg)
                res.status(200).json({ success: true, data: msg });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}