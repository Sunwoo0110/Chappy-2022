import path from 'path';
import { promises as fs } from 'fs';
import dbConnect from "../../../lib/dbConnect";

const TestCase = require("../../../models/Testcase");
const { exec } = require('child_process');

export default async function handler(req, res) {
    const { method } = req
    let code;
    let cmd;

    await dbConnect();

    /* 파이썬 파일 생성 및 실행 */
    const runPython = async (code) => {
        const codeDirectory = path.join(process.cwd(), 'code');
        const codePath = codeDirectory + '/source.py';
        
        await fs.writeFile(codePath, code, 'utf8');

        cmd = `python ${codePath}`
        let is_respond = false
    }

    switch (method) {
        
        /* 
            ** 실행 버튼 **
            req:
                body: {code: string} 
            res: 
                {result: string}
        */
        case 'POST':
            code = req.body;
            if (!code) res.json({ output: 'running code failed' })
            
            await runPython(code);

            exec(cmd, (error, stdout, stderr) => {
                res.status(200).json({ result: stdout })
            });
            break;
        
        /* 
            ** 채점 버튼 **
            req:
                params: num 
                body: {code: string} 
            res: 
                {result: [ {input: string, output: string, success: boolean} ]}
        */
        case 'PUT':
            code = req.body;
            if (!code) res.json({ output: 'running code failed' });

            const testcase = await TestCase.findOne({testnumber: req.params.num});
            var result = [];
            for (var i = 0; i < testcase.input.length; ++i) {

                await runPython(code);

                exec(cmd, (error, stdout, stderr) => {
                    if (stdout === (testcase.output[i]+'\n')) {
                        result.push({input: testcase.input[i], output: stdout, success: true})
                    } else {
                        result.push({input: testcase.input[i], output: stdout, success: false})
                    }
                });    
            }

            res.send({ result: result });
            break;

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}
