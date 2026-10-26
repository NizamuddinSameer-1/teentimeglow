/**
 * Markdown -> content_html for the TeenTimeGlow posts table.
 *
 * The article body is not general markdown: it is paragraphs, h2/h3, one table,
 * two lists, inline links, and raw <figure> blocks that must pass through
 * byte-for-byte. A general converter is unnecessary and risks escaping the
 * figures, so this handles exactly the constructs present and refuses anything
 * it does not recognise rather than guessing.
 */
import fs from 'fs';

const SRC = 'drafts/glass-skin-korean-routine-2026-10-26.md';
const raw = fs.readFileSync(SRC, 'utf8');

const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
if (!fmMatch) throw new Error('No front matter found');
const fm = fmMatch[1];
const body = raw.slice(fmMatch[0].length);

function fmValue(key) {
  const line = fm.split(/\r?\n/).find((l) => l.startsWith(key + ':'));
  if (!line) return null;
  return line.slice(key.length + 1).trim().replace(/^["']|["']$/g, '');
}

function inline(text) {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

const lines = body.split(/\r?\n/);
const out = [];
let i = 0;

function isTableRow(l) {
  return /^\s*\|.*\|\s*$/.test(l);
}

while (i < lines.length) {
  const line = lines[i];

  if (line.trim() === '') { i++; continue; }

  // Raw HTML block — pass through untouched.
  if (line.trim().startsWith('<figure')) {
    const block = [];
    while (i < lines.length && !lines[i].includes('</figure>')) { block.push(lines[i]); i++; }
    if (i < lines.length) { block.push(lines[i]); i++; }
    out.push(block.join('\n'));
    continue;
  }

  // Headings
  if (/^###\s+/.test(line)) { out.push('<h3>' + inline(line.replace(/^###\s+/, '')) + '</h3>'); i++; continue; }
  if (/^##\s+/.test(line)) { out.push('<h2>' + inline(line.replace(/^##\s+/, '')) + '</h2>'); i++; continue; }

  // Horizontal rule
  if (/^---+\s*$/.test(line)) { out.push('<hr />'); i++; continue; }

  // Table
  if (isTableRow(line)) {
    const rows = [];
    while (i < lines.length && isTableRow(lines[i])) { rows.push(lines[i]); i++; }
    const cells = (r) => r.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
    const header = cells(rows[0]);
    const dataRows = rows.slice(2).map(cells);
    let t = '<table>\n<thead>\n<tr>';
    header.forEach((c) => { t += '<th>' + inline(c) + '</th>'; });
    t += '</tr>\n</thead>\n<tbody>\n';
    dataRows.forEach((r) => {
      t += '<tr>';
      r.forEach((c) => { t += '<td>' + inline(c) + '</td>'; });
      t += '</tr>\n';
    });
    t += '</tbody>\n</table>';
    out.push('<div class="table-scroll">\n' + t + '\n</div>');
    continue;
  }

  // Unordered list
  if (/^-\s+/.test(line)) {
    const items = [];
    while (i < lines.length && /^-\s+/.test(lines[i])) {
      items.push(lines[i].replace(/^-\s+/, ''));
      i++;
    }
    out.push('<ul>\n' + items.map((it) => '  <li>' + inline(it) + '</li>').join('\n') + '\n</ul>');
    continue;
  }

  // Paragraph — consume until blank line or a structural marker.
  const para = [];
  while (
    i < lines.length &&
    lines[i].trim() !== '' &&
    !/^#{2,3}\s/.test(lines[i]) &&
    !isTableRow(lines[i]) &&
    !/^-\s+/.test(lines[i]) &&
    !/^---+\s*$/.test(lines[i]) &&
    !lines[i].trim().startsWith('<figure')
  ) {
    para.push(lines[i].trim());
    i++;
  }
  if (para.length) out.push('<p>' + inline(para.join(' ')) + '</p>');
}

const contentHtml = out.join('\n\n');

// Sanity: no unconverted markdown syntax should survive.
const leaks = [];
if (/^\s*##/m.test(contentHtml)) leaks.push('unconverted heading');
if (/\|\s*---/.test(contentHtml)) leaks.push('unconverted table separator');
if (/\]\(/.test(contentHtml)) leaks.push('unconverted link');
if (/\*\*/.test(contentHtml)) leaks.push('unconverted bold');

const record = {
  title: fmValue('title'),
  slug: fmValue('slug'),
  category: fmValue('category'),
  cover_image_url: fmValue('cover_image_url'),
  excerpt: fmValue('excerpt'),
  content_html: contentHtml,
  read_time_minutes: Number(fmValue('read_time_minutes')),
  is_published: true,
};

fs.writeFileSync('.tmp-post.json', JSON.stringify(record, null, 2), 'utf8');

const words = contentHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
console.log('title            ' + record.title);
console.log('slug             ' + record.slug);
console.log('category         ' + record.category);
console.log('excerpt chars    ' + record.excerpt.length);
console.log('read_time        ' + record.read_time_minutes);
console.log('html length      ' + contentHtml.length + ' chars');
console.log('rendered words   ' + words);
console.log('h2               ' + (contentHtml.match(/<h2>/g) || []).length);
console.log('h3               ' + (contentHtml.match(/<h3>/g) || []).length);
console.log('figure           ' + (contentHtml.match(/<figure>/g) || []).length);
console.log('table            ' + (contentHtml.match(/<table>/g) || []).length);
console.log('ul               ' + (contentHtml.match(/<ul>/g) || []).length);
console.log('links            ' + (contentHtml.match(/<a href=/g) || []).length);
console.log('leaks            ' + (leaks.length ? leaks.join(', ') : 'none'));
