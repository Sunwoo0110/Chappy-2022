import axios from "../../../../lib/api";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try{
                // 이전 과제를 찾기 위한 aggregate 쿼리
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

                // 이전 과제 조회
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

                // 과제가 없으면 undefined, 있으면 과제 id
                if (pastAssignmentData==undefined)
                    pastAssignmentId=undefined;
                else
                    pastAssignmentId=pastAssignmentData._id;

                // 다음 과제를 찾기 위한 aggregate 쿼리
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
                // 다음 과제 조회
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
                // 과제가 없으면 undefined, 있으면 과제 id
                if (nextAssignmentData==undefined)
                    nextAssignmentId=undefined
                else
                    nextAssignmentId=nextAssignmentData._id;
                // 이전 / 다음 과제 ID 반환
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

