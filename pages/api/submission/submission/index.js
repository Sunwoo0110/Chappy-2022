import dbConnect from "../../../../lib/dbConnect"
import Submission from "../../../../models/submission/Submission"
import qs from "qs";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        let query = qs.parse(req.query);
        const submissions = await Submission.find(query);
        res.status(200).json({ success: true, data: submissions });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case 'POST':
      try {
        const submission = await Submission.create(req.body);
        res.status(200).json({ success: true, data: submission })
      } catch (error) {
        res.status(400).json({ success: false, error: error })
      }
      break
    default:
      res.status(400).json({ success: false, data: [] });
      break;
  }
}
