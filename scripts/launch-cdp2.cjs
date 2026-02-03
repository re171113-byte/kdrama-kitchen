const { execSync, spawn } = require('child_process');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA = 'C:\\Users\\noble\\AppData\\Local\\Google\\Chrome\\User Data';

// Kill + lockfile
try { execSync('taskkill /F /IM chrome.exe', { stdio: 'ignore' }); } catch(e) {}
try { require('fs').unlinkSync(USER_DATA + '\\lockfile'); } catch(e) {}

setTimeout(() => {
  console.log('Launching Chrome...');
  const child = spawn(CHROME, [
    '--remote-debugging-port=9222',
    `--user-data-dir=${USER_DATA}`
  ], { stdio: ['ignore', 'pipe', 'pipe'] });

  child.stdout.on('data', d => console.log('OUT:', d.toString().trim()));
  child.stderr.on('data', d => console.log('ERR:', d.toString().trim()));
  child.on('exit', (code) => console.log(`EXIT: ${code}`));

  setTimeout(() => process.exit(0), 10000);
}, 3000);
