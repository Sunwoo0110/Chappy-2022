import axios from "../../../../lib/api";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try{
                let pastAssignmentBody = {
                    pipeline: [
                      {
                        $match: {
                          $expr : {
                            $and: [
                              {
                                $eq: [
                                  '$weeks' , 
                                  { $toInt: req.query.weeks } 
                                ] 
                              },
                            //   {
                            //     $eq: [
                            //       '$type' , 
                            //       { $toInt: req.query.type } 
                            //     ] 
                            //   },
                              {
                                $lt: [
                                  '$_id' , 
                                  { $toObjectId: req.query.assignment_id } 
                              ] 
                              }
                            ] 
                          }
                        }
                      },
                      {
                        $sort: {
                          _id: -1,
                        }
                      },
                    ]
                };                

                const pastAssignmentResponse = await axios({
                    method: 'post',
                    url: '/api/lecture/assignment/aggregate',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: pastAssignmentBody
                });
                const pastAssignmentData = pastAssignmentResponse.data.data[0];
                let pastAssignmentId;
                if (pastAssignmentData==undefined)
                    pastAssignmentId=undefined;
                else
                    pastAssignmentId=pastAssignmentData._id;


                let nextAssignmentBody = {
                    pipeline: [
                      {
                        $match: {
                          $expr : {
                            $and: [
                              {
                                $eq: [
                                  '$weeks' , 
                                  { $toInt: req.query.weeks } 
                                ] 
                              },
                            //   {
                            //     $eq: [
                            //       '$type' , 
                            //       { $toInt: req.query.type } 
                            //     ] 
                            //   },
                              {
                                $gt: [
                                  '$_id' , 
                                  { $toObjectId: req.query.assignment_id } 
                              ] 
                              }
                            ] 
                          }
                        }
                      },
                      {
                        $sort: {
                          _id: 1,
                        }
                      },
                    ]
                };                

                const nextAssignmentResponse = await axios({
                    method: 'post',
                    url: '/api/lecture/assignment/aggregate',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: nextAssignmentBody
                });
                const nextAssignmentData = nextAssignmentResponse.data.data[0];
                let nextAssignmentId;
                if (nextAssignmentData==undefined)
                    nextAssignmentId=undefined
                else
                    nextAssignmentId=nextAssignmentData._id;

                let resultData = {
                    pastAssignmentId: pastAssignmentId,
                    nextAssignmentId: nextAssignmentId,
                }

                res.status(200).json({success: true, data: resultData});

            } catch (error) {
                res.status(400).json({success: false, error: error})
            }
            break

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}

