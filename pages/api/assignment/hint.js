// https://github.com/extrabacon/python-shell
import { PythonShell } from "python-shell";
import { promises as fs, existsSync, unlinkSync } from 'fs';

import dbConnect from "../../../lib/dbConnect";

const path = require("path");
const Submission = require("../../../models/submission/Submission.js");

export default async function handler(req, res) {
  const { method } = req
  await dbConnect();

  switch (method) {
    case 'POST':
      const code = req.body?.code;
      if (code == undefined || code == null) {
        res.status(400).json({ errorMessage: "There is no code to handle." });
      }
      const assignmentId = "6300f814d273cf05e1cc975d"
      const graFeeHomeDir = path.join('GraFee');
      const codePath = path.join(graFeeHomeDir, 'code.py');
      await fs.writeFile(codePath, code, 'utf8');

      const options = {
        mode: 'text',
        pythonPath: '',
        pythonOptions: ['-u'],
        scriptPath: graFeeHomeDir,
        args: [
          '--mode', 'hint',
          '--target', codePath,
          '--assignment_id', assignmentId,
          '--code', code,
        ],
      }

      PythonShell.run('run.py', options, function (err, output_lines) {
        console.log('In the Callback');
        if (err) {
          console.log('err>');
          console.log(err);
          throw err;
        };
        if (output_lines == null) {
          res.status(400).json({ errorMessage: "Cannot run the script" });
          return;
        }
        const response = {
          data: output_lines.join("\n") + "\n",
        }
        // console.log('out>\n' + response.data);
        res.status(200).json(response);

        // Remove the target code file
        try {
          //unlinkSync(codePath)
        } catch (err) {
          console.error(err);
        }

      });

      //const code = req.body?.code;
      //if (code) {
      //    console.log(code);
      //}
      //let submissions = await Submission.find({});
      //console.log(submissions);
      /*const submission_data = {
          user_id: submissions[0].user_id,
          lecture_id: submissions[0].lecture_id,
          type: 0,
          ref_id: submissions[0].ref_id,
          user_code: code,
          submission_state: 1,
          submission_date: new Date(),
      }*/
      //console.log(submission_data);

      //const submission = new Submission(submission_data);
      /*await submission.save()
      .then(async ()=>{
          console.log("success submission adding");
              submissions = await Submission.find({});
          console.log(submissions);
          await Submission.findOneAndDelete({user_code: code})

          submissions = await Submission.find({});
          console.log(submissions);
      })
      .catch((err)=>{
          console.log("submission adding failed: ", err);
      });
      */

      // let out = await PythonShell.checkSyntax(code);

      /*const shell = PythonShell.runString(code, null, function (err, results) {
        if (err) throw err;
        const output = results.join("\n") + "\n";
        const response = {
          output: output,
          hint: dummyHint,
        }
        res.status(200).json(response);
      });
      */

      //res.status(200).json(dummyHint);
      //res.status(400).json({errorMessage: "Something goes wrong!"});
      break

    default:
      res.status(400).json({ success: false, data: [] })
      break
  }
}
