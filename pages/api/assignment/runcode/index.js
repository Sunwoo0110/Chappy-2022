import dbConnect from "../../../../lib/dbConnect";

const { runPython } = require("./runPython");

export default async function handler(req, res) {
    const { method } = req
    let code;

    await dbConnect();

    switch (method) {
        
        /* 
            ** 실행 버튼 **
            req:
                body: {code: string} 
            res: 
                {result: string}
        */
        case 'POST':
            try {
                code = req.body.code;
                if (!code) res.json({ output: 'running code failed' })
                
                const output = await runPython(code);
                res.status(200).json({ result: output });

            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break;
        
        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}
