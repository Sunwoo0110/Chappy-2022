export default async function handler(req, res) {
    const { method } = req

    switch (method) {
        case 'POST':
            let dummyHint = {
                "2":[
                    {
                      "Delete":"this statement"
                    }, 
                    {	
                      "Insert":"'If' statement"
                    }
                    ],
                "3":[
                    {
                      "Insert":"'Return' statement"
                    }
                    ],
                "4":[
                    {
                        "Insert":"'else' statement"
                    }
                    ],    
                "5":[
                    {
                        "Insert":"'Assignment' statement"
                    }
                    ]        
            };    

            console.log(req.body);

            res.status(200).json(dummyHint);
            break

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}
