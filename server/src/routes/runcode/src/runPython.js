const spawn = require('child_process').spawn;

function runPython() {

    let result;
    const run = spawn('python3', ['run.py']);

    // 비동기 처리
    return new Promise((resolve) => {
        run.stdout.on('data',  function(data) {
            result = data.toString();
            // console.log("stdout: " + result);
            resolve(result);
        });

        run.stderr.on('data',  function(data) {
            result = data.toString();
            // console.log("stderr: " + result);
            resolve(result);
        });
        
    });

};

module.exports =  { runPython };