import sharp from 'sharp';
import fs from 'fs';

const SRC = 'C:/Users/lenovo/.workbuddy-ai/clipboard-images/';
const OUT = 'public/assets/';

const jobs = [
  { key: 'cover',   src: 'clipboard-2026-10-26T17-40-22-393Z-7afae86e.jpg', out: 'glass-skin-cover-202610.jpg',   w: 1200, h: 675, q: 84 },
  { key: 'morning', src: 'clipboard-2026-10-26T17-40-22-400Z-f8a218fe.jpg', out: 'glass-skin-morning-202610.jpg', w: 1200, h: 800, q: 82 },
  { key: 'night',   src: 'clipboard-2026-10-26T17-40-22-411Z-4fbefe10.jpg', out: 'glass-skin-night-202610.jpg',   w: 1200, h: 800, q: 82 },
  { key: 'order',   src: 'clipboard-2026-10-26T17-40-22-417Z-68904798.jpg', out: 'glass-skin-order-202610.jpg',   w: 1200, h: 800, q: 82 },
];

for (const job of jobs) {
  const meta = await sharp(SRC + job.src).metadata();
  console.log(
    job.key.padEnd(8) +
    'in  ' + String(meta.width) + 'x' + String(meta.height) +
    '  ratio ' + (meta.width / meta.height).toFixed(3)
  );

  await sharp(SRC + job.src)
    .rotate()
    .resize(job.w, job.h, { fit: 'cover', position: 'attention', withoutEnlargement: false })
    .jpeg({ quality: job.q, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(OUT + job.out);

  const stat = fs.statSync(OUT + job.out);
  const after = await sharp(OUT + job.out).metadata();
  console.log(
    '         out ' + String(after.width) + 'x' + String(after.height) +
    '  ' + (stat.size / 1024).toFixed(0) + ' KB  ' + job.out
  );
}
