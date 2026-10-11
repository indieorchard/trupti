/**
 * Downloads images from Wikimedia Commons using the API to get real URLs.
 * Uses the Wikimedia API: action=query&prop=imageinfo to get actual thumb URLs.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public', 'images');

// Create dirs
['deities', 'temples', 'scriptures'].forEach(d =>
  fs.mkdirSync(path.join(PUBLIC, d), { recursive: true })
);

// Real Wikimedia Commons filenames (extracted from URLs / verified titles)
const IMAGES = {
  deities: {
    shiva: 'Shiva as the Lord of Dance LACMA edit.jpg',
    vishnu: 'Bhagavan Vishnu.jpg',
    krishna: 'Krishna in Brindavan.jpg',
    rama: 'Rama with bow.jpg',
    ganesha: 'Ganesha Basohli miniature circa 1730 Dubost p73.jpg',
    hanuman: 'Hanuman fetches the herb-bearing mountain, in aండ scene from the Ramayana.jpg',
    durga: 'Durga Mahisasuramardini.JPG',
    lakshmi: 'Raja Ravi Varma - Lakshmi.jpg',
    saraswati: 'Saraswati by Raja Ravi Varma.jpg',
    kali: 'Kali by Raja Ravi Varma.jpg',
    parvati: 'Parvati by Raja Ravi Varma.jpg',
    kartikeya: 'Murugan by Raja Ravi Varma.jpg',
    radha: 'Radha by Raja Ravi Varma.jpg',
    sita: 'Ravana Sita Jatayus.jpg',
    brahma: 'Indian - Brahma - Walters 25260.jpg',
    ganga: 'Ravi Varma-Ganga.jpg',
  },
  temples: {
    badrinath: 'Badrinath Temple - Oct 2014.jpg',
    kedarnath: 'Kedarnath Temple.jpg',
    gangotri: 'Gangotri Temple uttridge.jpg',
    yamunotri: 'Yamunotri temple.JPG',
    kashi_vishwanath: 'Shri Kashi Vishwanath Temple.jpg',
    somnath: 'Somnath mandir.jpg',
    mahakaleshwar: 'Mahakal Temple Ujjain.jpg',
    puri_jagannath: 'Jagannath Temple Puri.jpg',
    dwarkadhish: 'Dwarkadhish Temple in 2024.jpg',
    rameswaram: 'Ramanathaswamy Temple Corridor.jpg',
    konark_sun_temple: 'Konark Sun Temple Front view.jpg',
    akshardham_delhi: 'Akshardham (Delhi).jpg',
    meenakshi_temple: 'Meenakshi Amman temple Madurai.jpg',
    siddhivinayak: 'Siddhivinayak Temple, Mumbai.jpg',
    tirupati_balaji: 'Tirumala 090615.jpg',
    dakshineswar_kali: 'Dakshineswar Kali Temple, West Bengal, India.jpg',
    lingaraj_temple: 'Lingaraja temple Bhubaneswar 11007.jpg',
  },
  scriptures: {
    bhagavad_gita: 'Bhagavad Gita, 19th century manuscript.jpg',
    rigveda: 'Rigveda MS2097.jpg',
  }
};

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'TruptiApp/1.0 (https://github.com/indieorchard/trupti; spiritual companion app)' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const follow = (u, n = 0) => {
      if (n > 5) return reject(new Error('Too many redirects'));
      https.get(u, { headers: { 'User-Agent': 'TruptiApp/1.0 (https://github.com/indieorchard/trupti)' } }, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return follow(res.headers.location, n + 1);
        }
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }).on('error', reject);
    };
    follow(url);
  });
}

async function getThumbUrl(filename, width = 400) {
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&iiurlwidth=${width}&format=json`;
  const data = await fetchJson(apiUrl);
  const pages = data?.query?.pages;
  if (!pages) return null;
  const page = Object.values(pages)[0];
  if (page?.imageinfo?.[0]?.thumburl) return page.imageinfo[0].thumburl;
  if (page?.imageinfo?.[0]?.url) return page.imageinfo[0].url;
  return null;
}

async function main() {
  let success = 0, fail = 0, skip = 0;
  const results = {};

  for (const [category, entries] of Object.entries(IMAGES)) {
    for (const [id, filename] of Object.entries(entries)) {
      const ext = path.extname(filename).toLowerCase() || '.jpg';
      const localFile = `${id}${ext === '.jpeg' ? '.jpg' : ext}`;
      const destPath = path.join(PUBLIC, category, localFile);
      const localPath = `/images/${category}/${localFile}`;

      // Skip if already downloaded
      if (fs.existsSync(destPath) && fs.statSync(destPath).size > 5000) {
        console.log(`SKIP: ${localPath} (${(fs.statSync(destPath).size / 1024).toFixed(0)} KB)`);
        results[`${category}:${id}`] = localPath;
        skip++;
        continue;
      }

      try {
        const thumbUrl = await getThumbUrl(filename, 400);
        if (!thumbUrl) {
          console.log(`FAIL: ${id} - No URL found for "${filename}"`);
          fail++;
          continue;
        }

        await downloadFile(thumbUrl, destPath);
        const size = fs.statSync(destPath).size;
        if (size < 1000) {
          console.log(`FAIL: ${id} - Downloaded only ${size} bytes (likely error page)`);
          fs.unlinkSync(destPath);
          fail++;
          continue;
        }
        console.log(`OK: ${localPath} (${(size / 1024).toFixed(0)} KB)`);
        results[`${category}:${id}`] = localPath;
        success++;
      } catch (err) {
        console.log(`FAIL: ${id} - ${err.message}`);
        fail++;
      }

      // Small delay to be nice to Wikimedia
      await new Promise(r => setTimeout(r, 200));
    }
  }

  console.log(`\n=== ${success} downloaded, ${skip} skipped, ${fail} failed ===`);

  // Calculate total storage
  let total = 0;
  for (const d of ['deities', 'temples', 'scriptures']) {
    const dp = path.join(PUBLIC, d);
    if (fs.existsSync(dp)) {
      for (const f of fs.readdirSync(dp)) {
        total += fs.statSync(path.join(dp, f)).size;
      }
    }
  }
  console.log(`Total image storage: ${(total / 1024 / 1024).toFixed(1)} MB`);

  // List what we got
  for (const d of ['deities', 'temples', 'scriptures']) {
    const dp = path.join(PUBLIC, d);
    if (fs.existsSync(dp)) {
      const files = fs.readdirSync(dp).filter(f => fs.statSync(path.join(dp, f)).size > 1000);
      console.log(`${d}: ${files.length} images - ${files.join(', ')}`);
    }
  }
}

main().catch(console.error);
