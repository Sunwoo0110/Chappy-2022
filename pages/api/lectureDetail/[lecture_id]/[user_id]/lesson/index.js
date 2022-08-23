import dbConnect from "../../../../../../lib/dbConnect";
import Lesson from "../../../../../../models/lecture/Lesson"
import Attendance from "../../../../../../models/lecture/Attendance";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try{
                let week = 1; //week어떻게 보여줄건지,,??

                const lessons = await Lesson.find({
                    "lecture_id":req.query.lecture_id, 
                    "type":0,
                    "weeks":week
                });

                const attendancInfoLessons = await Promise.all(lessons.map( async (lesson) => {
                    let attendance = await Attendance.find({"lesson_id":lesson._id});
                    let data = {};
                    data["lesson"] = lesson;
                    data["attendance"] = attendance[0].attendance[req.query.user_id];
                    return data;
                }));

                res.status(200).json({success: true, data: attendancInfoLessons})

            } catch (error) {
                if(error.name=="CastError")
                    res.status(200).json({success: true, data: -1})            
                res.status(400).json({success: false, error: error})
            }
            break

        case 'POST':
            try{
                console.log(typeof req.body);
                let lesson;
                if (typeof req.body === 'object'){
                    lesson = await Lesson.create(req.body);
                }
                else if (typeof req.body === 'string'){
                    if(req.body=="clear"){
                        await Lesson.remove({});
                        lesson = "removed all data";
                    }
                }
                else{
                    lesson = await Lesson.find({_id: req.body})
                }
                res.status(200).json({success: true, data: lesson})
            } catch(error){
                res.status(400).json({success: false, error: error})
            }
            break

        case 'DELETE':
            try {
                console.log('delete:', req.body.id);
                const result = await Lesson.findByIdAndDelete(req.body.id)
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break    

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}
