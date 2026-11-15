// Screenshots each screens/*.html at 2x into public/shots/, with the boxes marked by data-box, into src/shots.json.
//   NODE_PATH=<dir with playwright> node screens/shoot.cjs
const {chromium} = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const dir = __dirname, out = {};
  const browser = await chromium.launch({channel: 'chrome'});
  const page = await browser.newPage({viewport: {width: 820, height: 600}, deviceScaleFactor: 2});
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.html')).sort()) {
    const name = f.replace('.html', '');
    await page.goto('file://' + path.join(dir, f));
    const main = await page.$('main');
    const m = await main.boundingBox();
    const boxes = await page.$$eval('[data-box]', (els, m) => els.map((e) => {
      const r = e.getBoundingClientRect();
      return {x: Math.round((r.x - m.x) * 2), y: Math.round((r.y - m.y) * 2), w: Math.round(r.width * 2), h: Math.round(r.height * 2), label: e.dataset.box};
    }), m);
    await main.screenshot({path: path.join(dir, '..', 'public', 'shots', name + '.png')});
    out[name] = {src: `shots/${name}.png`, width: Math.round(m.width * 2), height: Math.round(m.height * 2), boxes};
  }
  fs.writeFileSync(path.join(dir, '..', 'src', 'shots.json'), JSON.stringify(out, null, 1));
  await browser.close();
  for (const [k, v] of Object.entries(out)) console.log(k, v.width, v.height, (v.width / v.height).toFixed(2), v.boxes.length);
})();
