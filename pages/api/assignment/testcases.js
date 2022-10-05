/** /pages/api/assignment/assignment.js **/
import dbConnect from "../../../lib/dbConnect"
import TestCase from "../../../models/lecture/Testcase"
import { Types } from "mongoose";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                let data;
                if (req.query) {
                    data = req.query;
                } else if (req.body) {
                    data = req.body;
                }
                const assignmentId = new Types.ObjectId(data?.assignmentId);
                const testNumber = data?.testNumber;

                let query;
                if (testNumber == undefined) {
                    query = {
                        'assignment_id':  assignmentId};
                } else {
                    query = {
                        'assignment_id':  assignmentId,
                        'testnumber': testNumber,};
                }
                const testcases = await TestCase.find(query);
                // console.log(testcases)
                res.status(200).json({ success: true, data: testcases })
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}