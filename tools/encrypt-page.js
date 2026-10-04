// Encrypts a single-file HTML page behind a password gate.
//   node tools/encrypt-page.js <input.html> [output.html]
// The password is read from the FLEX_PAGE_PASSWORD environment variable, or asked for
// interactively. It is never written to disk: the output holds only the salt, IV and
// AES-256-GCM ciphertext (key derived with PBKDF2-SHA256).
const fs = require('fs'), path = require('path'), crypto = require('crypto'), readline = require('readline');
const [src, out = 'index.html'] = process.argv.slice(2);
if (!src) { console.error('usage: node tools/encrypt-page.js <input.html> [output.html]'); process.exit(1); }
const ITER = 600000;

function ask(q) {
  return new Promise(res => { const rl = readline.createInterface({ input: process.stdin, output: process.stdout }); rl.question(q, a => { rl.close(); res(a); }); });
}

(async () => {
  const password = process.env.FLEX_PAGE_PASSWORD || await ask('Password: ');
  if (!password) { console.error('No password given.'); process.exit(1); }
  const salt = crypto.randomBytes(16), iv = crypto.randomBytes(12);
  const key = crypto.pbkdf2Sync(password, salt, ITER, 32, 'sha256');
  const c = crypto.createCipheriv('aes-256-gcm', key, iv);
  const data = Buffer.concat([c.update(fs.readFileSync(src)), c.final(), c.getAuthTag()]); // WebCrypto expects ciphertext||tag
  const payload = { iter: ITER, salt: salt.toString('base64'), iv: iv.toString('base64'), data: data.toString('base64') };
  const tpl = fs.readFileSync(path.join(__dirname, 'gate-template.html'), 'utf8');
  fs.writeFileSync(out, tpl.replace('/*PAYLOAD*/null', JSON.stringify(payload)));
  console.log('wrote', out, (fs.statSync(out).size / 1048576).toFixed(2) + 'MB');
})();
