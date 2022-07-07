import path from 'path';
import { promises as fs } from 'fs';
const { exec } = require('child_process');


export default async function handler(req, res) {
    const { method } = req

    switch (method) {
        case 'POST':
            const code = req.body
            if (!code) res.json({ output: 'running code failed' })

            const codeDirectory = path.join(process.cwd(), 'code');
            const codePath = codeDirectory + '/source.py'
            await fs.writeFile(codePath, code, 'utf8');

            const cmd = `python ${codePath}`
            let is_respond = false
            exec(cmd, (error, stdout, stderr) => {
                res.status(200).json({ output: stdout })
            });
            break

        default:
            res.status(400).json({ success: false, data: [] })
            break
    }
}
