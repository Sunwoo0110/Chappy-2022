
import dbConnect from "../../../../lib/dbConnect"

import axios from "../../../../lib/api";


export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();   
    switch (method) {
        case 'GET':
            try {
                const startDay = new Date(req.query.start_day) //한국시간 기준 string으로 넘어온 쿼리에 9시간이 추가로 더해짐
                const utcStartDay = startDay.getTime() + (startDay.getTimezoneOffset() * 60 * 1000);
                const koreaStartDay = new Date(utcStartDay);
                
                const now = new Date(); // 현재 시간
                const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); // 현재 시간을 utc로 변환한 밀리세컨드값
                const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
                const koreaNow = new Date(utcNow+koreaTimeDiff);

                // console.log("startDay: ",koreaStartDay.toString())
                // console.log("koreaNow: ",koreaNow.toString())

                var week=parseInt((koreaNow.getTime()-koreaStartDay.getTime())/(1000*3600*24));
                week=parseInt(week / 7)+1;
                // console.log("week: ",week)
                
                res.status(200).json({ success: true, data: week });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] });
            break;
    }
}