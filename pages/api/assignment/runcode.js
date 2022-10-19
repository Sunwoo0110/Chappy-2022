import dbConnect from "../../../lib/dbConnect";
// https://github.com/extrabacon/python-shell
import { PythonShell } from "python-shell";
import TestCase from "../../../models/lecture/Testcase"
import { Types } from "mongoose";

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
      const testNumber = req.body?.testNumber;

      const code = req.body?.code;
      if (!code) res.status(400).json({ success: false, data: [], error: 'There is no code to run' });

      let assignmentId;
      if (req.body?.assignmentId === undefined) {
        assignmentId = req.body?.assignmentId;
      } else {
        assignmentId = new Types.ObjectId(req.body?.assignmentId);
      }

      if (testNumber == undefined) {
        PythonShell.runString(code, null, (error, output_lines) => {
          if (error) {
            console.log(error);
            res.status(400).json({ success: false, data: [], error: "runCode:error" })
            return;
          }
          let response = {
            result: "",
          }
          if (output_lines !== null) {
            response.result = output_lines.join("\n");
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
      break;

    default:
      res.status(400).json({ success: false, data: [], error: "runCode:methodUnknown" })
      break
  }
}
