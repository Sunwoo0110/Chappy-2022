import path from 'path';
import { promises as fs } from 'fs';
import dbConnect from "../../lib/dbConnect";
const TestCase = require("../../models/Testcase");
const { exec } = require('child_process');

export default async function handler(req, res) {
    const { method } = req

    await dbConnect();

    let code;

    const runPython = async () => {
        const codeDirectory = path.join(process.cwd(), 'code');
        const codePath = codeDirectory + '/source.py';
        
        await fs.writeFile(codePath, code, 'utf8');

        const cmd = `python ${codePath}`
        let is_respond = false
        exec(cmd, (error, stdout, stderr) => {
            res.status(200).json({ result: stdout })
        });
    }

    switch (method) {
        // 실행 버튼
        // body : {code: string} 
        case 'POST':
            code = req.body
            if (!code) res.json({ output: 'running code failed' })

            break;
        
        // 채점 버튼
        // params: num, body : {code: string} 
        case 'PUT':
            code = req.body;
            if (!code) res.json({ output: 'running code failed' });

            const testcase = await TestCase.findOne({testnumber: req.params.num});
        var result = [];
        for (var i = 0; i < testcase.input.length; ++i) {
            converter(req.body.code, testcase.input[i]);
            const tc_ouput = await runPython();
            // console.log(testcase.input[i]);
            // console.log(tc_ouput);
            // console.log(testcase.output[i]);

            // tc_output 에 \n 가 존재함
            if (tc_ouput === (testcase.output[i]+'\n')) {
                result.push({input: testcase.input[i], output: tc_ouput, success: true})
            } else {
                result.push({input: testcase.input[i], output: tc_ouput, success: false})
            }
        }

        res.send({ result: result });


        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}
