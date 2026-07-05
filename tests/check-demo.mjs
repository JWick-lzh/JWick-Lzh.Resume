// 用法: node tests/check-demo.mjs <子目录>   例: node tests/check-demo.mjs boss
// 起本地静态服务 + 真 Chrome 打开 /<子目录>/，断言:
//  1) body 有可见文本  2) 零 console error  3) 除本服务外零网络请求(不许打 localhost 后端/外网)
import { chromium } from 'playwright';
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = normalize(join(fileURLToPath(import.meta.url), '..', '..'));
const PORT = 8124;
const dir = process.argv[2];
if (!dir) { console.error('用法: node tests/check-demo.mjs <子目录>'); process.exit(2); }
const MIME = { '.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json','.ico':'image/x-icon','.woff2':'font/woff2' };

const server = http.createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    let fp = join(ROOT, p);
    if (existsSync(fp) && statSync(fp).isDirectory()) fp = join(fp, 'index.html');
    if (!existsSync(fp)) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[extname(fp)] || 'application/octet-stream' });
    res.end(await readFile(fp));
  } catch (e) { res.writeHead(500); res.end(String(e)); }
});
await new Promise(r => server.listen(PORT, r));

const errors = [];
const badRequests = [];
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('request', r => {
  const u = r.url();
  if (!u.startsWith(`http://localhost:${PORT}/`) && !u.startsWith('data:') && !u.startsWith('blob:')) badRequests.push(u);
});
await page.goto(`http://localhost:${PORT}/${encodeURIComponent(dir)}/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
const text = (await page.locator('body').innerText()).trim();

let ok = true;
const check = (name, cond, detail='') => { console.log(`${cond ? '✅' : '❌'} ${name}${detail ? ' — ' + detail : ''}`); if (!cond) ok = false; };
check(`${dir}: 页面有可见内容`, text.length > 10, `文本 ${text.length} 字`);
check(`${dir}: 零 console error`, errors.length === 0, errors.slice(0,3).join(' | '));
check(`${dir}: 零外部/localhost 后端请求`, badRequests.length === 0, badRequests.slice(0,3).join(' | '));
await browser.close();
server.close();
process.exit(ok ? 0 : 1);
