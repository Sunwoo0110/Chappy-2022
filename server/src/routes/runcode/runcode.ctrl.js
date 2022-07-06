const User = require("../../schema/UserSchema");
const TestCase = require("../../schema/TestCaseSchema")
const converter = require("./src/converter");
const { runPython } = require("./src/runPython");
const { Router } = require("express");
const router = Router();

exports.get_root = async (req,res) => {
    try {
        // res.header("Access-Control-Allow-Origin", "*");
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
        // res.header("Access-Control-Allow-Origin", "*");
        converter(req.body.code, null);
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
// res: {result: [ {input: string, output: string, success: boolean} ]}
exports.put_grade_code = async (req,res) => {
    console.log(req.body);

    try {
        const testcase = await TestCase.findOne({testnumber: req.params.num});
        var result = [];
        for (var i = 0; i < testcase.input.length; ++i) {
            converter(req.body.code, testcase.input[i]);
            const tc_ouput = await runPython();
            console.log(testcase.input[i]);
            console.log(tc_ouput);
            console.log(testcase.output[i]);

            // tc_output 에 \n 가 존재함
            if (tc_ouput === (testcase.output[i]+'\n')) {
                result.push({input: testcase.input[i], output: tc_ouput, success: true})
            } else {
                result.push({input: testcase.input[i], output: tc_ouput, success: false})
            }
        }

        res.send({ result: result });
    } catch (err) {
        console.log(err);
        res.send("error");
        
    }

};

