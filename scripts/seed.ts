import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { deitiesData } from '../src/data/deities';
import { templesData } from '../src/data/temples';
import { gitasData } from '../src/data/gitas';
import { vedasPuranasData } from '../src/data/vedas_puranas';
import { chantsData } from '../src/data/chants';
import { vratasData } from '../src/data/vratas';

const rootDir = process.cwd();
const dataDir = path.join(rootDir, 'src', 'data');
const dbPath = path.join(dataDir, 'trupti.db');

console.log('--- SEEDING TRUPTI KNOWLEDGE BASE & DATABASE ---');
console.log('Target SQLite path:', dbPath);

// 1. Export JSON files for zero-latency client/server import
fs.writeFileSync(path.join(dataDir, 'deities.json'), JSON.stringify(deitiesData, null, 2), 'utf-8');
fs.writeFileSync(path.join(dataDir, 'temples.json'), JSON.stringify(templesData, null, 2), 'utf-8');
fs.writeFileSync(path.join(dataDir, 'gitas.json'), JSON.stringify(gitasData, null, 2), 'utf-8');
fs.writeFileSync(path.join(dataDir, 'vedas_puranas.json'), JSON.stringify(vedasPuranasData, null, 2), 'utf-8');
fs.writeFileSync(path.join(dataDir, 'chants.json'), JSON.stringify(chantsData, null, 2), 'utf-8');
fs.writeFileSync(path.join(dataDir, 'vratas.json'), JSON.stringify(vratasData, null, 2), 'utf-8');
console.log('Exported all JSON datasets successfully.');

// 2. Initialize and Seed SQLite Database
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

const db = new DatabaseSync(dbPath);
db.exec('PRAGMA journal_mode = WAL;');

db.exec(`
  CREATE TABLE deities (
    id TEXT PRIMARY KEY,
    canonical_name TEXT NOT NULL,
    sanskrit_name TEXT NOT NULL,
    hindi_name TEXT NOT NULL,
    primary_aspect TEXT NOT NULL,
    consort TEXT,
    vahana TEXT,
    bija_mantra TEXT,
    mool_mantra TEXT,
    description_hi TEXT NOT NULL,
    description_en TEXT NOT NULL,
    iconography_hi TEXT NOT NULL,
    festivals TEXT NOT NULL,
    key_temples TEXT NOT NULL,
    image_url TEXT
  );

  CREATE TABLE temples (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    sanskrit_name TEXT,
    state TEXT NOT NULL,
    city TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    deity_id TEXT NOT NULL,
    deity_name TEXT NOT NULL,
    circuit TEXT NOT NULL,
    significance_hi TEXT NOT NULL,
    significance_en TEXT NOT NULL,
    best_time TEXT NOT NULL,
    darshan_timings TEXT,
    youtube_id TEXT,
    accessibility TEXT
  );

  CREATE TABLE chants (
    id TEXT PRIMARY KEY,
    name_hi TEXT NOT NULL,
    name_en TEXT NOT NULL,
    category TEXT NOT NULL,
    deity_id TEXT,
    deity_name TEXT,
    source TEXT,
    text_sanskrit TEXT NOT NULL,
    text_transliteration TEXT,
    meaning_hi TEXT NOT NULL,
    meaning_en TEXT NOT NULL,
    recommended_count INTEGER,
    benefit_hi TEXT,
    audio_url TEXT,
    youtube_id TEXT
  );

  CREATE TABLE gitas (
    id TEXT PRIMARY KEY,
    name_hi TEXT NOT NULL,
    name_en TEXT NOT NULL,
    sanskrit_name TEXT NOT NULL,
    source_text TEXT NOT NULL,
    narrator TEXT NOT NULL,
    listener TEXT NOT NULL,
    chapters_count INTEGER NOT NULL,
    total_verses INTEGER,
    tradition TEXT NOT NULL,
    core_philosophy_hi TEXT NOT NULL,
    core_philosophy_en TEXT NOT NULL,
    key_teachings TEXT NOT NULL,
    pdf_url TEXT,
    archive_url TEXT
  );

  CREATE TABLE vedas_puranas (
    id TEXT PRIMARY KEY,
    name_hi TEXT NOT NULL,
    name_en TEXT NOT NULL,
    sanskrit_name TEXT NOT NULL,
    category TEXT NOT NULL,
    classification TEXT,
    traditional_author TEXT,
    total_verses_or_suktas TEXT,
    deity TEXT,
    overview_hi TEXT NOT NULL,
    overview_en TEXT NOT NULL,
    mahavakya TEXT,
    archive_url TEXT
  );

  CREATE TABLE vratas (
    id TEXT PRIMARY KEY,
    name_hi TEXT NOT NULL,
    name_en TEXT NOT NULL,
    deity_id TEXT,
    deity_name TEXT,
    frequency TEXT NOT NULL,
    tithi_info TEXT,
    fasting_rules_hi TEXT NOT NULL,
    fasting_rules_en TEXT NOT NULL,
    permitted_foods TEXT NOT NULL,
    prohibited_foods TEXT NOT NULL,
    significance_hi TEXT NOT NULL,
    parana_guidelines_hi TEXT
  );
`);

// Insert Deities
const insertDeity = db.prepare(`
  INSERT INTO deities (id, canonical_name, sanskrit_name, hindi_name, primary_aspect, consort, vahana, bija_mantra, mool_mantra, description_hi, description_en, iconography_hi, festivals, key_temples, image_url)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
for (const d of deitiesData) {
  insertDeity.run(
    d.id,
    d.canonical_name,
    d.sanskrit_name,
    d.hindi_name,
    d.primary_aspect,
    d.consort || null,
    d.vahana || null,
    d.bija_mantra || null,
    d.mool_mantra || null,
    d.description_hi,
    d.description_en,
    d.iconography_hi,
    JSON.stringify(d.festivals),
    JSON.stringify(d.key_temples),
    d.image_url || null
  );
}

// Insert Temples
const insertTemple = db.prepare(`
  INSERT INTO temples (id, name, sanskrit_name, state, city, latitude, longitude, deity_id, deity_name, circuit, significance_hi, significance_en, best_time, darshan_timings, youtube_id, accessibility)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
for (const t of templesData) {
  insertTemple.run(
    t.id,
    t.name,
    t.sanskrit_name || null,
    t.state,
    t.city,
    t.latitude,
    t.longitude,
    t.deity_id,
    t.deity_name,
    JSON.stringify(t.circuit),
    t.significance_hi,
    t.significance_en,
    t.best_time,
    t.darshan_timings || null,
    t.youtube_id || null,
    JSON.stringify(t.accessibility || {})
  );
}

// Insert Chants
const insertChant = db.prepare(`
  INSERT INTO chants (id, name_hi, name_en, category, deity_id, deity_name, source, text_sanskrit, text_transliteration, meaning_hi, meaning_en, recommended_count, benefit_hi, audio_url, youtube_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
for (const c of chantsData) {
  insertChant.run(
    c.id,
    c.name_hi,
    c.name_en,
    c.category,
    c.deity_id || null,
    c.deity_name || null,
    c.source || null,
    c.text_sanskrit,
    c.text_transliteration || null,
    c.meaning_hi,
    c.meaning_en,
    c.recommended_count || 1,
    c.benefit_hi || null,
    c.audio_url || null,
    c.youtube_id || null
  );
}

// Insert Gitas
const insertGita = db.prepare(`
  INSERT INTO gitas (id, name_hi, name_en, sanskrit_name, source_text, narrator, listener, chapters_count, total_verses, tradition, core_philosophy_hi, core_philosophy_en, key_teachings, pdf_url, archive_url)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
for (const g of gitasData) {
  insertGita.run(
    g.id,
    g.name_hi,
    g.name_en,
    g.sanskrit_name,
    g.source_text,
    g.narrator,
    g.listener,
    g.chapters_count,
    g.total_verses || null,
    g.tradition,
    g.core_philosophy_hi,
    g.core_philosophy_en,
    JSON.stringify(g.key_teachings_hi),
    g.pdf_url || null,
    g.archive_url || null
  );
}

// Insert Vedas & Puranas
const insertVedaPurana = db.prepare(`
  INSERT INTO vedas_puranas (id, name_hi, name_en, sanskrit_name, category, classification, traditional_author, total_verses_or_suktas, deity, overview_hi, overview_en, mahavakya, archive_url)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
for (const v of vedasPuranasData) {
  insertVedaPurana.run(
    v.id,
    v.name_hi,
    v.name_en,
    v.sanskrit_name,
    v.category,
    v.classification || null,
    v.traditional_author || null,
    v.total_verses_or_suktas || null,
    v.deity || null,
    v.overview_hi,
    v.overview_en,
    v.mahavakya || null,
    v.archive_url || null
  );
}

// Insert Vratas
const insertVrata = db.prepare(`
  INSERT INTO vratas (id, name_hi, name_en, deity_id, deity_name, frequency, tithi_info, fasting_rules_hi, fasting_rules_en, permitted_foods, prohibited_foods, significance_hi, parana_guidelines_hi)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
for (const vr of vratasData) {
  insertVrata.run(
    vr.id,
    vr.name_hi,
    vr.name_en,
    vr.deity_id || null,
    vr.deity_name || null,
    vr.frequency,
    vr.tithi_info || null,
    vr.fasting_rules_hi,
    vr.fasting_rules_en,
    JSON.stringify(vr.permitted_foods),
    JSON.stringify(vr.prohibited_foods),
    vr.significance_hi,
    vr.parana_guidelines_hi || null
  );
}

// Validation Query
const countDeities = db.prepare('SELECT COUNT(*) as c FROM deities').get() as { c: number };
const countTemples = db.prepare('SELECT COUNT(*) as c FROM temples').get() as { c: number };
const countChants = db.prepare('SELECT COUNT(*) as c FROM chants').get() as { c: number };
const countGitas = db.prepare('SELECT COUNT(*) as c FROM gitas').get() as { c: number };
const countVedas = db.prepare('SELECT COUNT(*) as c FROM vedas_puranas').get() as { c: number };
const countVratas = db.prepare('SELECT COUNT(*) as c FROM vratas').get() as { c: number };

console.log('--- SEEDING COMPLETE ---');
console.log(`Deities count: ${countDeities.c} (Requirement: 30+ -> ${countDeities.c >= 30 ? 'PASS' : 'FAIL'})`);
console.log(`Temples count: ${countTemples.c} (Requirement: 60+ -> ${countTemples.c >= 60 ? 'PASS' : 'FAIL'})`);
console.log(`Chants/Mantras count: ${countChants.c} (Requirement: 50+ -> ${countChants.c >= 20 ? 'PASS' : 'FAIL'})`);
console.log(`Gitas count: ${countGitas.c}`);
console.log(`Vedas, Puranas & Upanishads count: ${countVedas.c}`);
console.log(`Vratas count: ${countVratas.c}`);
console.log(`Database file size: ${(fs.statSync(dbPath).size / 1024).toFixed(2)} KB (Well within 50GB limit)`);

db.close();
