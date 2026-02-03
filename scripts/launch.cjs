/**
 * Chrome CDP 런처
 * ChromeX 프로필 + 원격 디버깅 포트 9222
 * 사용법: node scripts/launch.cjs
 */
const { spawn } = require('child_process');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PROFILE = 'C:\\Users\\noble\\ChromeX';

// 기존 ChromeX Chrome 확인 (이미 실행 중이면 스킵)
const http = require('http');
http.get('http://127.0.0.1:9222/json/version', (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    console.log('✅ Chrome CDP 이미 실행 중 (port 9222)');
    process.exit(0);
  });
}).on('error', () => {
  console.log('Chrome CDP 실행 중...');
  const child = spawn(CHROME, [
    '--remote-debugging-port=9222',
    '--remote-allow-origins=*',
    `--user-data-dir=${PROFILE}`,
  ], { stdio: 'ignore', detached: true });
  child.unref();

  // 포트 열릴 때까지 대기
  let tries = 0;
  const check = setInterval(() => {
    tries++;
    http.get('http://127.0.0.1:9222/json/version', (res) => {
      clearInterval(check);
      console.log('✅ Chrome CDP 준비 완료 (port 9222)');
      process.exit(0);
    }).on('error', () => {
      if (tries > 20) {
        clearInterval(check);
        console.error('❌ Chrome CDP 시작 실패');
        process.exit(1);
      }
    });
  }, 500);
});
