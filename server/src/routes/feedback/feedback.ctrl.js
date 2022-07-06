const user = require("../../schema/FeedbackSchema");
// const connectDb = require("../db");
const { Router } = require("express");
const router = Router();

// post test
exports.post_test = async (req, res) => {
    try{
        console.log("heheh");
        console.log(req.body);
        res.send("kkk");
    } catch (err) {
        console.log("error!!");
        console.log(err);
        res.send("error");
    }
    console.log("end");
}

// get feedback
exports.get_feedback = async (req, res) => {
    try{
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
        res.send(dummyFeedback);      
    } catch (err) {
        console.log("error!!");
        console.log(err);
        res.send("error");
    }
}




