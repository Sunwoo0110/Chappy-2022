import dbConnect from "../../../lib/dbConnect";
import Notice from "../../../models/Notice"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try{
                const notices = await Notice.find({})
                res.status(200).json({success: true, data: notices})
            } catch (error) {
                res.status(400).json({success: false, error: error})
            }
            break

        case 'POST':
            try{
                let notice;
                if (typeof req.body === 'object'){
                    notice = await Notice.create(req.body);
                }
                else{
                    notice = await Notice.find({_id: req.body})
                }
                res.status(200).json({success: true, data: notice})
            } catch(error){
                res.status(400).json({success: false, error: error})
            }
            break

        case 'DELETE':
            try {
                console.log('delete:', req.body.id);
                const result = await Notice.findByIdAndDelete(req.body.id)
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
