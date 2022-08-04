import dbConnect from "../../../lib/dbConnect";
import Test from "../../../models/Exam"

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try{
                const tests = await Test.find({})
                res.status(200).json({success: true, data: tests})
            } catch (error) {
                res.status(400).json({success: false, error: error})
            }
            break

        case 'POST':
            try{
                let test;
                if (typeof req.body === 'object'){
                    test = await Test.create(req.body);
                }
                else{
                    test = await Test.find({_id: req.body})
                }
                res.status(200).json({success: true, data: test})
            } catch(error){
                res.status(400).json({success: false, error: error})
            }
            break

        case 'DELETE':
            try {
                console.log('delete:', req.body.id);
                const result = await Test.findByIdAndDelete(req.body.id)
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
