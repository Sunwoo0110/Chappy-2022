/* string to python file */

const fs = require('fs');

const converter = (code, input) => {
    if (input !== null){
        fs.writeFile('run.py', code+"\n"+input, (err) => {
            if(err) {
                // console.log(err);
            }
            else {
                // console.log(fs.readFileSync('run.py').toString());
            }
        });
    } else {
        fs.writeFile('run.py', code, (err) => {
            if(err) {
                // console.log(err);
            }
            else {
                // console.log(fs.readFileSync('run.py').toString());
            }
        });
    }
};

module.exports =  converter;