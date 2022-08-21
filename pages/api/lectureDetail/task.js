import dbConnect from "../../../lib/dbConnect";
import Task from "../../../models/Task"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try{
                const tasks = await Task.find({})
                res.status(200).json({success: true, data: tasks})
            } catch (error) {
                res.status(400).json({success: false, error: error})
            }
            break

        case 'POST':
            try{
                let task;
                if (typeof req.body === 'object'){
                    task = await Task.create(req.body);
                }
                else{
                    task = await Task.find({_id: req.body})
                }
                res.status(200).json({success: true, data: task})
            } catch(error){
                res.status(400).json({success: false, error: error})
            }
            break

        case 'DELETE':
            try {
                console.log('delete:', req.body.id);
                const result = await Task.findByIdAndDelete(req.body.id)
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
