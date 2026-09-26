import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dbPath = path.join(rootDir, 'src', 'data', 'trupti.db');

console.log('Seeding Trupti SQLite database at:', dbPath);

// Ensure directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Remove old database if exists to rebuild cleanly
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

const db = new DatabaseSync(dbPath);

// Enable WAL mode & foreign keys
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS deities (
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

  CREATE TABLE IF NOT EXISTS temples (
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

  CREATE TABLE IF NOT EXISTS chants (
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

  CREATE TABLE IF NOT EXISTS gitas (
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

  CREATE TABLE IF NOT EXISTS vedas_puranas (
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

  CREATE TABLE IF NOT EXISTS vratas (
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

console.log('Tables created successfully.');

// Read compiled datasets by dynamically importing or evaluating TypeScript/JSON
// We'll write a runner or import transpile
console.log('Database schema initialized at', dbPath);
db.close();
