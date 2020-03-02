const fs = require('fs').promises;
const runAll = require('npm-run-all');

const CONFIG_PATH = './config/index.js';
const CONFIGS = [
  './config/local.js',
  './config/default.js',
];
async function start() {
  for (const filePath of CONFIGS) {
    try {
      await fs.access(filePath);
      await fs.copyFile(filePath, CONFIG_PATH);
      break;
    } catch (e) { }
  }
  runAll(["expo"], {
    stdin: process.stdin,
    stdout: process.stdout,
    stderr: process.stderr,
  });
}

start();
