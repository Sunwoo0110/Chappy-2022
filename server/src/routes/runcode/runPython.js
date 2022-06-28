const spawn = require('child_process').spawn;


const runPython = () => {

    const result = spawn('python3', ['run.py']);

    // return output
    result.stdout.on('data', function(data) {
        return data.toString();
    });
    // return error
    result.stderr.on('data', function(data) {
        return data.toString();
    });

};
