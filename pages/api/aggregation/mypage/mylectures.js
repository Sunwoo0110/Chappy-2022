
import dbConnect from "../../../../lib/dbConnect"
import Info from "../../../../models/lecture/Info"
import Profile from "../../../../models/user/Profile"

import useSWR, { useSWRConfig } from "swr"



export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    const fetcher = (url) => {
        // console.log('URL:', url, typeof url)
        if (typeof url != 'string') return { data: [] }
        return fetch(url).then((res) => {
            // console.log(res)
            return res.json()
        })
    }
    

    switch (method) {
        case 'GET':
            try {
                // console.log("req.query.user_id: ",req.query.user_id)
                // const { data } = useSWR(`http://localhost:3000/api/user/profile?_id=${req.query.user_id}`, fetcher)
                // console.log("data: ",data)
                // var lecID = data.data[0].lecture_list;
                var lectures = [];

                // console.log("lecID: ",lecID)
                
                // for (let id of lecID){
                //     let { data :lec } = useSWR(`/api/lecture/info?_id=${id}`, fetcher)
                //     lectures.push(lec.data[0]);
                // }

                res.status(200).json({ success: true, lectures: lectures });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}