
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
                const semester=req.query.open_semester;

                var lecID = users.data.data[0].lecture_list;
                var lectures = [];
                
                for (let id of lecID){
                    let p;
                    if(semester===undefined){
                        p={_id: id,}
                    }
                    else{
                        p={_id: id, open_semester: semester,}
                    }

                    const lec = await axios.get('/api/lecture/info', { params: p });
                    
                    if(lec.data.data[0]!==undefined){
                        lectures.push(lec.data.data[0]);
                    } 
                }

                res.status(200).json({ success: true, lectures: lectures });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        case 'DELETE':
            try {
                const users = await axios.get('/api/user/profile', {
                    params: {
                        _id: req.query.user_id,
                    }
                });
                var lectures = users.data.data[0].lecture_list;
                let newlectures = lectures.filter((e) => e !== req.query.lecture_id);

                await axios.patch('/api/user/profile', {
                    lecture_list: newlectures,
                },
                {
                    params: {
                        _id: req.query.user_id,
                    }
                });
                
                res.status(201).json({ success: true, lectures: newlectures })
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}