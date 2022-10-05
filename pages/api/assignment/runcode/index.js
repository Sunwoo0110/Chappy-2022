import dbConnect from "../../../../lib/dbConnect";
// https://github.com/extrabacon/python-shell
import { PythonShell } from "python-shell";
import TestCase from "../../../../models/lecture/Testcase"
import { Types } from "mongoose";
const { runPython } = require("./runPython");

export default async function handler(req, res) {
  const { method } = req

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
      const code = req.body?.code;
      if (!code) res.json({ output: 'There is no code to run' });

      const assignmentId = new Types.ObjectId(req.body?.assignmentId);
      const testNumber = req.body?.testNumber;

      if (testNumber == undefined) {
        PythonShell.runString(code, null, (error, output_lines) => {
          if (error) {
            res.status(400).json({ success: false, data: [] })
            return;
          }
          if (output_lines == null) {
            res.status(200).json({ result: "" });
            return;
          }
          const response = {
            result: output_lines.join("\n"),
          }
          res.status(200).json(response);
        });
      } else {
        const query = {
          'assignment_id': assignmentId,
          'testnumber': testNumber,
        };
        const testcase = await TestCase.findOne(query);
        const codeWithTestCase = `${code}\nprint(${testcase.input[0]})`;

        const options = {
          mode: 'text',
          pythonPath: '/Users/jeonghohyeon/opt/anaconda3/envs/soty/bin/python',
          pythonOptions: ['-u'],
        }

        PythonShell.runString(codeWithTestCase, options, (error, output_lines) => {
          if (error) {
            res.status(400).json({ success: false, data: [], error: error })
            return;
          }
          if (output_lines == null) {
            res.status(200).json({ result: "Empty" });
            return;
          }
          const response = {
            result: output_lines.join("\n"),
          }
          res.status(200).json(response);
        });
      }

      /* try {
        const output = await runPython(code);
        res.status(200).json({ result: output });
      } catch (error) {
        res.status(400).json({ success: false, error: error })
      } */
      break;

    default:
      res.status(400).json({ success: false, data: [] })
      break
  }
}
