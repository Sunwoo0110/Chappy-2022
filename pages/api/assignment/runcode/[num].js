import dbConnect from "../../../../lib/dbConnect";

const TestCase = require("../../../../models/Testcase");
const { runPython } = require("./runPython");

export default async function handler(req, res) {
    const { method } = req
    let code;
    let cmd;

    await dbConnect();

    switch (method) {
        
        /* 
            ** 채점 버튼 **
            req:
                params: num 
                body: {code: string} 
            res: 
                {result: [ {input: string, output: string, success: boolean} ], score: Int}
        */
        case 'POST':
            try { 
                code = req.body.code;
                
                if (!code) res.json({ output: 'running code failed' });

                const testcase = await TestCase.findOne({testnumber: req.query.num});
                // console.log(testcase)
                var result = [];
                var check = 0;
                for (var i = 0; i < testcase.input.length; ++i) {
                    const tc_output = await runPython(code+testcase.input[i]);

                     // tc_output 에 \n 가 존재함
                    if (tc_output === (testcase.output[i]+'\n')) {
                        ++check;
                        result.push({input: testcase.input[i], output: tc_output, success: true})
                    } else {
                        result.push({input: testcase.input[i], output: tc_output, success: false})
                    }
                }
                var score = parseInt(100 * (check / testcase.input.length));
                res.send({ result: result, score: score });
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break;

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}
