
import dbConnect from "../../../../lib/dbConnect"

import axios from "../../../../lib/api";


export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();    

    switch (method) {
        case 'GET':
            try {
                const submissions = await axios.get('/api/submission/submission', { params : req.query });
                var objections = [];                
                for (let sub of submissions.data.data){
                    const obj = await axios.get('/api/submission/objection'
                    , {
                        params: {
                            submission_id: sub._id,
                        }
                    });
                    for(let o of obj.data.data){
                        let d= new Date(o.date);
                        const year=d.getFullYear();
                        const month=d.getMonth();
                        const date=d.getDate();
                        let check="미확인";
                        if(o.check===true){
                            check="확인";
                        }
                        const lec = await axios.get('/api/lecture/info', {_id: sub.lecture_id});

                        let objection={
                            title: o.title,
                            date:year+"."+month+"."+date,
                            professor:lec.data.data[0].professor,
                            check: check,
                            _id: o._id,
                        }
                        objections.push(objection);
                    }                    
                }
                // console.log("objections: ",objections)
                res.status(200).json({ success: true, data: objections });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}