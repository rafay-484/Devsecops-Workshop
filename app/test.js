const http = require('http');

const server = require('./index');
const PORT = process.env.PORT || 3000;

let passed = 0;
let failed = 0;

function check(name, actual, expected) {
  const condition = expected === undefined ? actual : actual === expected;
  if (condition) {
    console.log(`✅ PASS: ${name}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${name} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    failed++;
  }
}

function request(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${PORT}${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

function waitForServer(retries = 10, delay = 100) {
  return new Promise((resolve, reject) => {
    function attempt() {
      http.get(`http://localhost:${PORT}/health`, (res) => {
        res.resume();
        resolve();
      }).on('error', () => {
        if (retries-- > 0) {
          setTimeout(attempt, delay);
        } else {
          reject(new Error('Server did not become ready in time'));
        }
      });
    }
    attempt();
  });
}

async function runTests() {
  await waitForServer();

  const root = await request('/');
  check('GET / returns 200', root.status, 200);
  check('GET / returns expected message', root.body.includes('DevSecOps Workshop'), true);

  const health = await request('/health');
  check('GET /health returns 200', health.status, 200);
  check('GET /health returns OK', health.body, 'OK');

  server.close();
  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
