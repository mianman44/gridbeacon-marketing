// Import the reviewed, user-supplied Stitch export as static homepage content.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(process.argv[2] || 'D:/code.txt', 'utf8');
const configText = source.match(/<script id="tailwind-config">([\s\S]*?)<\/script>/)[1];
const context = { tailwind: {} };
vm.runInNewContext(configText, context, { timeout: 1000 });
const config = context.tailwind.config;
config.content = ['./components/marketing/stitch-home.html'];
config.important = '#stitch-home';
config.corePlugins = { preflight: false };
fs.mkdirSync(path.join(root, 'design'), { recursive: true });
fs.writeFileSync(path.join(root, 'design/stitch-tailwind.cjs'), 'module.exports = ' + JSON.stringify(config, null, 2));
let html = source.match(/<body[^>]*>([\s\S]*?)<\/body>/)[1]
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<!--([\s\S]*?)-->/g, '')
  .replace(/\s+on\w+="[^"]*"/gi, '');
const routes = { home: '/', signup: '/signup', login: '/login', 'privacy-policy': '/privacy', 'terms-of-service': '/terms', security: '/security', 'system-status': '/contact', 'agency-solutions': '#agency-solutions' };
html = html.replace(/<a\b[^>]*>/g, tag => {
  const key = tag.match(/data-path="([^"]+)"/)?.[1];
  let href = routes[key];
  if (key?.startsWith('compare-')) href = '/features';
  return href ? tag.replace(/href="[^"]*"/, `href="${href}"`) : tag;
});
// Native disclosures preserve the reference's initially expanded answers and work without JavaScript.
html = html.replace(/<div class="([^"]*)">\s*<button class="faq-toggle([^<]*?)">([\s\S]*?)<\/button>\s*<div class="faq-content([^"]*)">([\s\S]*?)<\/div>\s*<\/div>/g,
  '<details open class="$1"><summary class="faq-toggle$2">$3</summary><div class="faq-content$4">$5</div></details>');
html = html.replace('<main class=', '<main id="main-content" class=');
fs.writeFileSync(path.join(root, 'components/marketing/stitch-home.html'), html);
fs.writeFileSync(path.join(root, 'components/marketing/stitch-markup.ts'), '// Static, reviewed Stitch design. Regenerate with scripts/import-stitch.cjs.\nexport const stitchMarkup = ' + JSON.stringify(html) + ';\n');
fs.writeFileSync(path.join(root, 'design/stitch-input.css'), '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n');
console.log('Imported Stitch layout and design tokens.');
