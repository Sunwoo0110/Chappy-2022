/* string to python file */

const fs = require('fs');

const converter = (code) => {
    fs.writeFile('run.py', code, (err) => {
        if(err) 
            console.log(err);
        else {
            console.log(fs.readFileSync('run.py'));
        }
    });
};

exports.module = converter;