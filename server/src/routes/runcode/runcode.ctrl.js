const User = require("../../schema/UserSchema");
const TestCase = require("../../schema/TestCaseSchema")
const converter = require("./converter");
const { runPython } = require("./runPython");
const { Router } = require("express");
const router = Router();

exports.get_root = async (req,res) => {
    try {
        const users = await User.find({});
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
        converter(req.body.code);
        const result = await runPython();
        // console.log(result);
        res.send({result: result});

    } catch (err) {
        console.log(err);
        res.send("error");
    }
};

// code 채점하고 테스트 케이스 결과값 반환 
// params: num, body : {code: string} 
exports.put_grade_code = async (req,res) => {
    // console.log(req.body);

    // try {
    //     const testcase = await TestCase.findOne({testnumber: req.params.num});
        
    //     // for testcase.input

    //     // res.send({ users: users });
    // } catch (err) {
    //     console.log(err);
    //     res.send("error");
        
    // }

};

