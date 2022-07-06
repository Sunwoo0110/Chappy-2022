// const connectDb = require("../db");
const { Router } = require("express");
const router = Router();

// post hint
exports.post_hint = async (req, res) => {
    try{
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
        res.send(dummyHint);      
    } catch (err) {
        console.log("error!!");
        console.log(err);
        res.send("error");        
    }
}
