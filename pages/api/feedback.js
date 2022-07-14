export default async function handler(req, res) {
    const { method } = req

    switch (method) {
        case 'POST':
            let dummyFeedback = {
                "2":[
                    {
                      "Delete":"this statement"
                    }, 
                    {	
                      "Insert":"    if lst==[]"
                    }
                    ],
                "3":[
                    {
                      "Insert":"        return []"
                    }
                    ],
                "4":[
                    {
                        "Insert":"  else:"
                    }
                    ],    
                "5":[
                    {
                        "Insert":"      result=[lst[0]]"
                    }
                    ]        
                };
    
            console.log(req.body);

            res.status(200).json(dummyFeedback);
            break

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}
