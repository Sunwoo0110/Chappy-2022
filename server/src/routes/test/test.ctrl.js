const user = require("../../schema/UserSchema");
// const connectDb = require("../db");
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

// // add user habit
// exports.get_add_title = async (req,res) => {
//     db.query(`INSERT INTO habit(title, count) VALUES (${req.params.title}, 0)`, (error, rows) => {
//         if (error) {
//             res.send("fail");
//             throw error;
//         } 
//         res.send("success");
//         console.log(rows);
//     });
// };

// // click event
// exports.get_click_title = async (req,res) => {
//     console.log(type(res.params))
//     db.query(`UPDATE habit SET count = count + 1 WHERE title = ${req.params.title}`, (error, rows) => {
//         if (error) {
//             res.send("fail");
//             throw error;
//         } 
//         if (rows.changedRows == 0) {
//             res.send("Wrong title");
//         } else {
//             res.send("success");
//         }
//         console.log(rows);
    
//     });
// }