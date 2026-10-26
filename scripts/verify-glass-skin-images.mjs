import fs from 'fs';
import sharp from 'sharp';

const draft = fs.readFileSync('drafts/glass-skin-korean-routine-2026-10-26.md', 'utf8');

// Every img src in the draft must exist on disk.
const srcs = [...draft.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
const cover = draft.match(/cover_image_url:\s*(\S+)/)[1];
const all = [cover, ...srcs];

let problems = 0;
for (const src of all) {
  const path = 'public' + src;
  if (!fs.existsSync(path)) {
    console.log('MISSING  ' + src);
    problems++;
    continue;
  }
  const meta = await sharp(path).metadata();
  const kb = (fs.statSync(path).size / 1024).toFixed(0);
  const ratio = (meta.width / meta.height).toFixed(3);
  const isCover = src === cover;
  const expectRatio = isCover ? '1.778' : '1.500';
  const ratioOk = Math.abs(Number(ratio) - Number(expectRatio)) < 0.01;
  const sizeOk = Number(kb) <= (isCover ? 250 : 180);
  const dimsOk = isCover ? meta.width === 1200 && meta.height === 675 : meta.width === 1200;
  const flag = ratioOk && sizeOk && dimsOk ? 'OK  ' : 'FAIL';
  if (flag === 'FAIL') problems++;
  console.log(
    flag + '  ' + src.padEnd(42) +
    String(meta.width) + 'x' + String(meta.height) +
    '  ' + ratio + '  ' + kb + ' KB'
  );
}

// Alt text present on every in-body image?
const imgs = draft.match(/<img[^>]*>/g) || [];
const missingAlt = imgs.filter((t) => !/alt="[^"]+"/.test(t));
console.log('\nin-body images: ' + imgs.length + ', missing alt: ' + missingAlt.length);
console.log('cover set: ' + cover);
console.log(problems === 0 ? '\nALL CHECKS PASSED' : '\n' + problems + ' PROBLEM(S)');
