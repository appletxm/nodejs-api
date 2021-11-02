const { spawn, fork } = require('child_process')
const path = require('path')
const npmCmd = process.platform === 'win32'? 'npm.cmd' : 'npm'

// const scriptPath = path.resolve('./src/test/spawn-js/spawn-child.js')

// const child = spawn('node', [scriptPath], {
//   stdio: [null, null, null, 'ipc']
// })

const child = spawn(npmCmd, ['run', 'spwan-test'], {
  stdio: 'pipe',
  // stdio: [0, 1, 2, 'ipc'],
  // env: {
  //   NODE_ENV: 'production',
  //   PATH: process.env.PATH
  // }
})

// const child = fork(scriptPath)

child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

// child.on('message', (message) => {
//   console.log('**=====parent recieved**', message)
//   child.send('***parent message****')
// })