const user = require("../../schema/UserSchema");
const converter = require("./converter");
const runPython = require("./runPython");
const { Router } = require("express");
const router = Router();

exports.get_root = async (req,res) => {
    try {
        const users = await user.find({});
        res.send({ users: users });
    } catch (err) {
        console.log(err);
        res.send("error");
        
    }
};

// code 실행하고 결과값 반환
// body : {code: string} 
exports.post_run_code = async (req,res) => {
    try {
        // converter(req.body.code);
        // const result = await runPython();
        // console.log(result);
        // res.send({ result: result });
        console.log(req.body);
        res.send(req.body);
        // res.send("success");
    } catch (err) {
        console.log(err);
        res.send("error");
    }
};

// code 채점하고 테스슽 케이스 결과값 반환 
// body : {code: string, input: {변수명: string, ...}} 
exports.post_grade_code = async (req,res) => {
    console.log(req.body);


};

