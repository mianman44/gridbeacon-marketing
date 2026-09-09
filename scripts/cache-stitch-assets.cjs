const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
async function get(url) { const r = await fetch(url, {signal:AbortSignal.timeout(30000)}); if (!r.ok) throw Error(`${r.status}: ${url}`); return r; }
(async () => {
  let html = fs.readFileSync(path.join(root,'components/marketing/stitch-home.html'),'utf8');
  const urls = [...new Set([...html.matchAll(/src="(https:[^"]+)"/g)].map(m=>m[1]))];
  fs.mkdirSync(path.join(root,'public/stitch'),{recursive:true});
  for (const [i,url] of urls.entries()) {
    const response = await get(url.replaceAll('&amp;','&'));
    const type=response.headers.get('content-type')||'';
    const ext=type.includes('png')?'png':type.includes('webp')?'webp':type.includes('svg')?'svg':'jpg';
    const local=`/stitch/asset-${i}.${ext}`;
    fs.writeFileSync(path.join(root,'public',local),Buffer.from(await response.arrayBuffer()));
    html=html.replaceAll(url,local);
  }
  const fontUrls = ['https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap','https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap'];
  let css='';
  for (const url of fontUrls) css+=await (await get(url)).text();
  const files=[...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map(m=>m[1]))];
  for (const [i,url] of files.entries()) {
    const local=`/stitch/font-${i}.${url.split('.').pop()}`;
    fs.writeFileSync(path.join(root,'public',local),Buffer.from(await (await get(url)).arrayBuffer()));
    css=css.replaceAll(url,local);
  }
  fs.writeFileSync(path.join(root,'public/stitch-fonts.css'),css);
  fs.writeFileSync(path.join(root,'components/marketing/stitch-home.html'),html);
  fs.writeFileSync(path.join(root,'components/marketing/stitch-markup.ts'),'// Reviewed static Stitch homepage; no executable export scripts.\nexport const stitchMarkup = '+JSON.stringify(html)+';\n');
  console.log(`Saved ${urls.length} original images and ${files.length} font files locally.`);
})().catch(e=>{console.error(e.message);process.exitCode=1});
