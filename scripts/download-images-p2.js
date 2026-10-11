/**
 * Phase 2: Search Wikimedia for correct filenames, then download.
 * Uses Wikimedia search API to find the right file for each entity.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public', 'images');

['deities', 'temples', 'scriptures'].forEach(d =>
  fs.mkdirSync(path.join(PUBLIC, d), { recursive: true })
);

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const follow = (u, n = 0) => {
      if (n > 5) return reject(new Error('Too many redirects'));
      https.get(u, { headers: { 'User-Agent': 'TruptiApp/1.0 (https://github.com/indieorchard/trupti; spiritual app) Node.js' } }, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return follow(res.headers.location, n + 1);
        }
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => resolve({ status: res.statusCode, data }));
      }).on('error', reject);
    };
    follow(url);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const follow = (u, n = 0) => {
      if (n > 5) return reject(new Error('Too many redirects'));
      https.get(u, { headers: { 'User-Agent': 'TruptiApp/1.0 Node.js' } }, res => {
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

async function searchAndDownload(searchTerm, destPath, width = 400) {
  // Search for images on Wikimedia Commons
  const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srsearch=${encodeURIComponent(searchTerm)}&srlimit=3&format=json`;
  const res = await httpsGet(searchUrl);
  const data = JSON.parse(res.data);
  
  if (!data.query?.search?.length) return null;
  
  // Try each result until one works
  for (const result of data.query.search) {
    const title = result.title; // e.g. "File:Shiva Nataraja.jpg"
    const filename = title.replace('File:', '');
    
    // Get the actual image URL via imageinfo
    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&iiurlwidth=${width}&format=json`;
    const infoRes = await httpsGet(infoUrl);
    const infoData = JSON.parse(infoRes.data);
    const pages = infoData.query?.pages;
    if (!pages) continue;
    
    const page = Object.values(pages)[0];
    const thumbUrl = page?.imageinfo?.[0]?.thumburl || page?.imageinfo?.[0]?.url;
    if (!thumbUrl) continue;
    
    // Download it
    await downloadFile(thumbUrl, destPath);
    const size = fs.statSync(destPath).size;
    if (size > 3000) {
      return { filename, size };
    }
    // Too small, try next result
    fs.unlinkSync(destPath);
  }
  return null;
}

// Items that need downloading (failed in phase 1)
const NEEDED = {
  deities: {
    vishnu: 'Vishnu Hindu deity painting',
    krishna: 'Krishna flute painting Ravi Varma',
    rama: 'Lord Rama bow painting',
    hanuman: 'Hanuman deity painting traditional',
    lakshmi: 'Lakshmi goddess painting Ravi Varma',
    parvati: 'Parvati goddess painting',
    radha: 'Radha painting Ravi Varma',
    sita: 'Sita Devi painting Hindu',
    brahma: 'Brahma Hindu god painting',
    ganga: 'Ganga river goddess painting Ravi Varma',
    yamuna: 'Yamuna goddess sculpture',
    gayatri: 'Gayatri Devi painting',
    chamundeshwari: 'Chamundeshwari Mysore',
    shani: 'Shani Dev painting',
    ayyappa: 'Swami Ayyappan painting',
    surya: 'Surya Sun god painting Hindu',
    kamakhya: 'Kamakhya Devi',
    meenakshi: 'Meenakshi goddess statue Madurai',
    jagannath: 'Jagannath Puri deity idol',
    venkateswara: 'Venkateswara Tirupati deity',
    vithoba: 'Vithoba Pandharpur idol',
    dattatreya: 'Dattatreya painting Hindu',
    narasimha: 'Narasimha painting Hindu',
    dhanvantari: 'Dhanvantari painting Hindu deity',
    kaal_bhairav: 'Bhairava painting Hindu',
    annapurna: 'Annapurna Devi painting',
    tulsi: 'Tulsi plant sacred Hindu',
    kubera: 'Kubera god wealth Hindu',
    tripura_sundari: 'Tripura Sundari goddess',
  },
  temples: {
    badrinath: 'Badrinath temple Uttarakhand',
    gangotri: 'Gangotri temple Uttarakhand',
    yamunotri: 'Yamunotri temple',
    somnath: 'Somnath temple Gujarat',
    mahakaleshwar: 'Mahakaleshwar temple Ujjain',
    dwarkadhish: 'Dwarkadhish temple Gujarat',
    rameswaram: 'Ramanathaswamy temple corridor',
    meenakshi_temple: 'Meenakshi Amman temple Madurai gopuram',
    siddhivinayak: 'Siddhivinayak temple Mumbai',
    dakshineswar_kali: 'Dakshineswar temple Kolkata',
    lingaraj_temple: 'Lingaraj temple Bhubaneswar',
    har_ki_pauri: 'Har Ki Pauri Haridwar ghat',
    vaishno_devi: 'Vaishno Devi temple Jammu',
    kolhapur_mahalakshmi: 'Mahalakshmi temple Kolhapur',
    kamakhya_temple: 'Kamakhya temple Guwahati',
    chamundeshwari_temple: 'Chamundeshwari temple Mysore hill',
    guruvayur: 'Guruvayur Krishna temple Kerala',
    padmanabhaswamy: 'Padmanabhaswamy temple Trivandrum',
    sabarimala: 'Sabarimala temple Kerala',
    srirangam: 'Srirangam temple gopuram',
    brihadisvara: 'Brihadisvara temple Thanjavur',
    chidambaram: 'Chidambaram Nataraja temple',
    shirdi_sai: 'Shirdi Sai Baba Samadhi Mandir',
    pandharpur_vithoba: 'Pandharpur Vithoba temple',
    shani_shingnapur: 'Shani Shingnapur temple',
    nathdwara_shrinathji: 'Shrinathji Nathdwara temple',
    pushkar_brahma: 'Pushkar Brahma temple Rajasthan',
    khatushyamji: 'Khatu Shyam temple Rajasthan',
    bankey_bihari: 'Banke Bihari temple Vrindavan',
    prem_mandir: 'Prem Mandir Vrindavan',
    sankat_mochan_varanasi: 'Sankat Mochan Hanuman temple Varanasi',
    vishnupad_gaya: 'Vishnupad temple Gaya Bihar',
    ram_mandir_ayodhya: 'Ram Mandir Ayodhya 2024',
    krishna_janmabhoomi: 'Krishna Janmabhoomi temple Mathura',
    tungnath: 'Tungnath temple Uttarakhand',
    trimbakeshwar: 'Trimbakeshwar Shiva temple',
    baidyanath: 'Baidyanath temple Deoghar',
    nageshwar: 'Nageshwar Jyotirlinga temple',
    grishneshwar: 'Grishneshwar temple',
    bhimashankar: 'Bhimashankar temple',
    omkareshwar: 'Omkareshwar temple',
    mallikarjuna: 'Srisailam Mallikarjuna temple',
    kalighat: 'Kalighat Kali temple Kolkata',
    kanchi_kamakshi: 'Kamakshi Amman temple Kanchipuram',
  },
  scriptures: {
    bhagavad_gita: 'Bhagavad Gita manuscript painting',
    yajurveda: 'Yajurveda manuscript',
    samaveda: 'Samaveda manuscript',
    atharvaveda: 'Atharva Veda manuscript',
    garuda_purana: 'Garuda Purana manuscript',
    shiva_purana: 'Shiva Purana manuscript painting',
    ashtavakra_gita: 'Ashtavakra sage painting',
    avadhuta_gita: 'Dattatreya avadhuta painting',
    uddhav_gita: 'Uddhava Krishna messenger painting',
    guru_gita: 'Guru disciple painting Hindu',
    vishnu_purana: 'Vishnu Purana manuscript',
    srimad_bhagavatam: 'Bhagavata Purana manuscript painting',
  }
};

async function main() {
  let success = 0, fail = 0, skip = 0;

  for (const [category, entries] of Object.entries(NEEDED)) {
    for (const [id, search] of Object.entries(entries)) {
      const destPath = path.join(PUBLIC, category, `${id}.jpg`);
      
      // Skip if already exists from phase 1
      if (fs.existsSync(destPath) && fs.statSync(destPath).size > 3000) {
        console.log(`SKIP: ${id} (exists ${(fs.statSync(destPath).size/1024).toFixed(0)} KB)`);
        skip++;
        continue;
      }

      try {
        const result = await searchAndDownload(search, destPath);
        if (result) {
          console.log(`OK: ${id}.jpg (${(result.size/1024).toFixed(0)} KB) <- "${result.filename}"`);
          success++;
        } else {
          console.log(`FAIL: ${id} - no valid image for "${search}"`);
          fail++;
        }
      } catch (err) {
        console.log(`FAIL: ${id} - ${err.message}`);
        fail++;
      }

      await new Promise(r => setTimeout(r, 300));
    }
  }

  console.log(`\n=== ${success} new, ${skip} existing, ${fail} failed ===`);

  // Total
  let total = 0;
  for (const d of ['deities', 'temples', 'scriptures']) {
    const dp = path.join(PUBLIC, d);
    if (fs.existsSync(dp)) {
      const files = fs.readdirSync(dp).filter(f => fs.statSync(path.join(dp, f)).size > 1000);
      total += files.reduce((s, f) => s + fs.statSync(path.join(dp, f)).size, 0);
      console.log(`${d}: ${files.length} files`);
    }
  }
  console.log(`Total: ${(total/1024/1024).toFixed(1)} MB`);
}

main().catch(console.error);
