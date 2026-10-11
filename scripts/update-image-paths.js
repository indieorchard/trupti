/**
 * Updates imageMap.ts to use local paths for downloaded images.
 * Falls back to Wikimedia URL if local file doesn't exist.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public', 'images');
const IMAGE_MAP = path.join(ROOT, 'src', 'data', 'imageMap.ts');

// Read current imageMap.ts
const content = fs.readFileSync(IMAGE_MAP, 'utf-8');

// For each category, check what files exist locally
const categories = {
  DEITY_IMAGES: 'deities',
  TEMPLE_IMAGES: 'temples',
  SCRIPTURE_IMAGES: 'scriptures',
};

let newContent = content;

for (const [varName, dir] of Object.entries(categories)) {
  const dirPath = path.join(PUBLIC, dir);
  if (!fs.existsSync(dirPath)) continue;
  
  const localFiles = new Set(fs.readdirSync(dirPath));
  
  // Find all entries in this Record and replace URLs with local paths
  const regex = new RegExp(`(\\s+)(\\w+):\\s*'(https?://[^']+)'`, 'g');
  
  // Only replace within the right section
  const sectionStart = newContent.indexOf(`export const ${varName}`);
  const sectionEnd = newContent.indexOf('};', sectionStart) + 2;
  let section = newContent.substring(sectionStart, sectionEnd);
  
  section = section.replace(regex, (match, ws, id, url) => {
    // Check if we have a local file for this ID
    for (const ext of ['.jpg', '.jpeg', '.png', '.gif']) {
      const filename = `${id}${ext}`;
      if (localFiles.has(filename)) {
        const filePath = path.join(dirPath, filename);
        const size = fs.statSync(filePath).size;
        if (size > 3000) {
          return `${ws}${id}: '/images/${dir}/${filename}'`;
        }
      }
    }
    // Keep original URL
    return match;
  });
  
  newContent = newContent.substring(0, sectionStart) + section + newContent.substring(sectionEnd);
}

// Update default constants
const deityDir = path.join(PUBLIC, 'deities');
const templeDir = path.join(PUBLIC, 'temples');
const scriptDir = path.join(PUBLIC, 'scriptures');

if (fs.existsSync(path.join(deityDir, 'shiva.jpg'))) {
  newContent = newContent.replace(
    /const DEFAULT_DEITY = '[^']+'/,
    "const DEFAULT_DEITY = '/images/deities/shiva.jpg'"
  );
}
if (fs.existsSync(path.join(templeDir, 'badrinath.jpg'))) {
  newContent = newContent.replace(
    /const DEFAULT_TEMPLE = '[^']+'/,
    "const DEFAULT_TEMPLE = '/images/temples/badrinath.jpg'"
  );
}
if (fs.existsSync(path.join(scriptDir, 'bhagavad_gita.jpg'))) {
  newContent = newContent.replace(
    /const DEFAULT_SCRIPTURE = '[^']+'/,
    "const DEFAULT_SCRIPTURE = '/images/scriptures/bhagavad_gita.jpg'"
  );
}

fs.writeFileSync(IMAGE_MAP, newContent, 'utf-8');

// Report
let localCount = 0, remoteCount = 0;
const localMatches = newContent.match(/\/images\/(deities|temples|scriptures)\//g);
const remoteMatches = newContent.match(/https:\/\/upload\.wikimedia/g);
localCount = localMatches ? localMatches.length : 0;
remoteCount = remoteMatches ? remoteMatches.length : 0;

console.log(`Updated imageMap.ts:`);
console.log(`  Local paths: ${localCount}`);
console.log(`  Remote URLs: ${remoteCount}`);
