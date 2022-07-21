 /* 파이썬 파일 생성 및 실행 */
import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

const runPython = async (code) => {
    const codeDirectory = path.join(process.cwd(), 'code');
    const codePath = codeDirectory + '/source.py';

    // console.log("code: "+code);
    
    await fs.writeFile(codePath, code, 'utf8');

    let result;
    // console.log(codePath);
    const run = spawn('python3', [codePath]);

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
}

module.exports =  { runPython };