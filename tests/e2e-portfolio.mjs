// 作品集端到端自测 —— 起本地静态服务 + 真实 Chrome 驱动，验证核心交互
// 运行：node tests/e2e-portfolio.mjs   （需 devDependency: playwright；使用系统 Chrome channel）
import { chromium } from 'playwright';
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = normalize(join(fileURLToPath(import.meta.url), '..', '..')); // 站点根
const PORT = 8123;
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.json': 'application/json',
};

const results = [];
const check = (name, cond, detail = '') => {
  results.push({ name, ok: !!cond, detail });
  console.log(`${cond ? '✅' : '❌'} ${name}${detail ? ' — ' + detail : ''}`);
};

function serve() {
  return new Promise((resolve) => {
    const server = http.createServer(async (req, res) => {
      try {
        let p = decodeURIComponent(req.url.split('?')[0]);
        if (p === '/') p = '/index.html';
        const fp = join(ROOT, p);
        if (!fp.startsWith(ROOT) || !existsSync(fp) || statSync(fp).isDirectory()) {
          res.writeHead(404); res.end('not found'); return;
        }
        const body = await readFile(fp);
        res.writeHead(200, { 'Content-Type': MIME[extname(fp)] || 'application/octet-stream' });
        res.end(body);
      } catch (e) {
        res.writeHead(500); res.end(String(e));
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function run() {
  const server = await serve();
  const base = `http://localhost:${PORT}`;
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  const consoleErrors = [];
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + e.message));

  // 1) 首屏加载无 JS 报错
  await page.goto(base + '/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  check('页面加载无 JS 报错', consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));
  // 1b) 首屏 hero 名字可见（reveal 已生效，非空白页）
  const heroVisible = await page.locator('.hero-name').evaluate((el) => {
    const s = getComputedStyle(el); return parseFloat(s.opacity) > 0.5 && el.getBoundingClientRect().width > 0;
  }).catch(() => false);
  check('首屏 hero 名字可见（非空白页）', heroVisible === true);
  const heroName = await page.locator('.hero-name').textContent();
  check('hero 名字有内容', !!(heroName && heroName.trim()), JSON.stringify(heroName));
  // 滚动触发 reveal
  await page.evaluate(() => document.getElementById('summary').scrollIntoView());
  await page.waitForTimeout(500);
  const revealInAfterScroll = await page.locator('.reveal.in').count();
  check('滚动后 .reveal 渐入 > 0', revealInAfterScroll > 0, `in=${revealInAfterScroll}`);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);

  // 1c) 深链 #work/supermagic 直接加载：抽屉开 + 背后 hero 仍可见
  const errBefore = consoleErrors.length;
  await page.goto(base + '/index.html#work/supermagic', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  check('深链直接加载无新 JS 报错', consoleErrors.length === errBefore, consoleErrors.slice(errBefore, errBefore + 2).join(' | '));
  check('深链直接加载抽屉自动打开', (await page.locator('#pf-drawer.open').count()) === 1);
  const heroVisible2 = await page.locator('.hero-name').evaluate((el) => parseFloat(getComputedStyle(el).opacity) > 0.5).catch(() => false);
  check('深链加载时背后页面内容可见', heroVisible2 === true);
  // 回到干净首页继续后续用例
  await page.goto(base + '/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);

  // 2) 能力矩阵渲染 11 条
  const capCount = await page.locator('.pf-cap').count();
  check('能力矩阵渲染 11 条', capCount === 11, `实际 ${capCount}`);

  // 3) 作品卡渲染 10 个
  const cardCount = await page.locator('.pf-card').count();
  check('作品卡渲染 10 个', cardCount === 10, `实际 ${cardCount}`);

  // 4) 分档 3 档
  const tierBars = await page.locator('.pf-tierbar').count();
  check('作品分 3 档', tierBars === 3, `实际 ${tierBars}`);

  // 5) 点击能力「多模态/OCR」→ 匹配卡高亮、无关卡淡化
  await page.locator('.pf-cap[data-cap="mm"]').scrollIntoViewIfNeeded();
  await page.locator('.pf-cap[data-cap="mm"]').click();
  await page.waitForTimeout(300);
  const matchCards = await page.locator('.pf-card.match').count();
  const dimCards = await page.locator('.pf-card.dim').count();
  const capActive = await page.locator('.pf-cap[data-cap="mm"].active').count();
  check('能力点击后进入 active 态', capActive === 1);
  check('多模态/OCR 高亮匹配卡 > 0', matchCards > 0, `match=${matchCards}`);
  check('无关卡被淡化', dimCards > 0 && matchCards + dimCards === 10, `match=${matchCards} dim=${dimCards}`);
  check('筛选写入 hash #cap/mm', page.url().includes('#cap/mm'), page.url());

  // 6) 再点一次取消筛选
  await page.locator('.pf-cap[data-cap="mm"]').click();
  await page.waitForTimeout(200);
  const dimAfter = await page.locator('.pf-card.dim').count();
  check('再次点击取消筛选', dimAfter === 0, `dim=${dimAfter}`);

  // 7) 点击作品卡「超级麦吉」→ 抽屉打开 + 标题正确 + 真实截图加载
  await page.locator('.pf-card[data-id="supermagic"]').click();
  await page.waitForTimeout(400);
  const drawerOpen = await page.locator('#pf-drawer.open').count();
  const drawerTitle = await page.locator('#pf-drawer-title').textContent();
  check('点作品卡抽屉打开', drawerOpen === 1);
  check('抽屉标题正确', /超级麦吉/.test(drawerTitle || ''), drawerTitle || '');
  check('抽屉深链 #work/supermagic', page.url().includes('#work/supermagic'));
  // 截图 <img> 自然尺寸 > 0（真的加载了，非裂图）
  const imgOk = await page.locator('#pf-drawer-body img.pf-shot').evaluate((img) => img.complete && img.naturalWidth > 0).catch(() => false);
  check('抽屉内真实截图已加载（非裂图）', imgOk === true);

  // 8) Esc 关闭抽屉
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  const drawerClosed = await page.locator('#pf-drawer.open').count();
  check('Esc 关闭抽屉', drawerClosed === 0);

  // 9) 深链直达内嵌原型作品（龙虾）→ iframe 存在且 src 指向真实原型
  await page.goto(base + '/index.html#work/lobster', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const iframeSrc = await page.locator('#pf-drawer-body iframe').getAttribute('src').catch(() => null);
  check('深链打开龙虾抽屉', (await page.locator('#pf-drawer.open').count()) === 1);
  check('抽屉内嵌真实原型 iframe', !!iframeSrc && iframeSrc.includes('lobster-task-center'), iframeSrc || '无 iframe');
  // iframe 内容真的加载（读到原型内文字）
  let frameLoaded = false;
  try {
    const frame = page.frameLocator('#pf-drawer-body iframe');
    await frame.locator('body').waitFor({ timeout: 4000 });
    const txt = await frame.locator('body').innerText({ timeout: 4000 });
    frameLoaded = /任务中心|知识|待处理/.test(txt);
  } catch (e) { frameLoaded = false; }
  check('内嵌原型页真实渲染（读到原型文字）', frameLoaded);

  // 10) 移动端原型抽屉用手机框
  await page.goto(base + '/index.html#work/boss', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const mobileFrame = await page.locator('#pf-drawer-body .pf-frame.mobile').count();
  check('老板助手用移动端手机框', mobileFrame === 1);

  // 10b) 每个作品打开后：入口链接没有 href="#"（点了不会跳顶），且每个可运行/原型作品有可打开的真实入口
  const workIds = await page.evaluate(() => window.PORTFOLIO.works.map(w => ({ id: w.id, tier: w.tier })));
  let badHash = 0, missingReal = 0;
  for (const w of workIds) {
    await page.goto(base + '/index.html#work/' + w.id, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(250);
    const links = await page.$$eval('#pf-drawer-body .pf-links a', (as) => as.map(a => ({ href: a.getAttribute('href'), target: a.getAttribute('target') })));
    if (links.some(l => l.href === '#')) badHash++;
    // Tier A/B 至少一个真实可打开入口（http 或 .html 或 demos）
    if ((w.tier === 'A' || w.tier === 'B') && w.id !== 'guanmai-platform') {
      const hasReal = links.some(l => /^https?:|\.html|\/demos\//.test(l.href || ''));
      if (!hasReal) missingReal++;
    }
  }
  check('所有作品入口无 href="#"（不会跳顶）', badHash === 0, `bad=${badHash}`);
  check('可运行/原型作品均有可打开的真实入口', missingReal === 0, `missing=${missingReal}`);

  // 10c) AI-Order 独立演示页可访问且渲染
  const aiDemo = await page.request.get(base + '/demos/ai-order.html');
  check('AI-Order 独立演示页可访问', aiDemo.ok(), `HTTP ${aiDemo.status()}`);
  await page.goto(base + '/demos/ai-order.html', { waitUntil: 'networkidle' });
  const aiDemoTitle = await page.locator('h1').first().textContent().catch(() => '');
  check('AI-Order 演示页标题正确', /AI-Order/.test(aiDemoTitle || ''), aiDemoTitle || '');

  // 11) 四张真实图片资源可访问（200 + 非空）
  await page.goto(base + '/index.html', { waitUntil: 'networkidle' });
  for (const img of ['supermagic-home.png', 'guanmai-arch.png', 'dtyq-home.png', 'aiorder-sample.png']) {
    const resp = await page.request.get(`${base}/portfolio/${img}`);
    check(`图片可访问 portfolio/${img}`, resp.ok(), `HTTP ${resp.status()}`);
  }

  // 12) 十个原型 HTML 可访问
  const protos = ['lobster-task-center', 'lobster-data-upload', 'lobster-users-roles', 'lobster-rbac', 'lobster-channels', 'boss-assistant', 'caibao-workbench', 'caibao-negotiation', 'caibao-supplier', 'caibao-config'];
  let protoOk = 0;
  for (const p of protos) {
    const resp = await page.request.get(`${base}/prototypes/${p}.html`);
    if (resp.ok()) protoOk++;
  }
  check('十个原型 HTML 均可访问', protoOk === 10, `${protoOk}/10`);

  // 13) 暗色 + 英文切换后作品集仍在（nav 有 Portfolio）
  await page.goto(base + '/index.html?theme=dark&lang=en', { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const navText = await page.locator('#nav-links').innerText();
  check('英文导航含 Portfolio', /Portfolio/.test(navText), navText.replace(/\n/g, ' '));
  const cardsEn = await page.locator('.pf-card').count();
  check('切换语言后作品卡仍渲染', cardsEn === 10, `实际 ${cardsEn}`);

  await browser.close();
  server.close();

  const failed = results.filter((r) => !r.ok);
  console.log(`\n==== 自测结果：${results.length - failed.length}/${results.length} 通过 ====`);
  if (failed.length) {
    console.log('失败项：\n' + failed.map((f) => ` - ${f.name} ${f.detail}`).join('\n'));
    process.exit(1);
  }
  console.log('全部通过 ✅');
  process.exit(0);
}

run().catch((e) => { console.error('自测异常：', e); process.exit(2); });
