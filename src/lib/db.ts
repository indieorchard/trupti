import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

let dbInstance: DatabaseSync | null = null;

export function getDatabase(): DatabaseSync {
  if (dbInstance) return dbInstance;

  const dbPath = path.join(process.cwd(), 'src', 'data', 'trupti.db');
  if (!fs.existsSync(dbPath)) {
    throw new Error('Trupti SQLite database not found. Please run seed script first.');
  }

  dbInstance = new DatabaseSync(dbPath, { readOnly: true });
  return dbInstance;
}

export function searchAll(query: string) {
  if (!query || query.trim().length === 0) return [];
  const db = getDatabase();
  const q = `%${query.trim().toLowerCase()}%`;

  const deities = db.prepare(`
    SELECT id, hindi_name as title, canonical_name as subtitle, 'deity' as type, '/knowledge/deities/' || id as url
    FROM deities 
    WHERE LOWER(hindi_name) LIKE ? OR LOWER(canonical_name) LIKE ? OR LOWER(description_hi) LIKE ?
    LIMIT 5
  `).all(q, q, q);

  const temples = db.prepare(`
    SELECT id, name as title, city || ', ' || state as subtitle, 'temple' as type, '/journey/temples#' || id as url
    FROM temples 
    WHERE LOWER(name) LIKE ? OR LOWER(sanskrit_name) LIKE ? OR LOWER(city) LIKE ? OR LOWER(significance_hi) LIKE ?
    LIMIT 5
  `).all(q, q, q, q);

  const chants = db.prepare(`
    SELECT id, name_hi as title, name_en as subtitle, category as type, '/knowledge/' || CASE WHEN category = 'aarti' THEN 'aarti' WHEN category = 'chalisa' THEN 'chalisa' ELSE 'stotra' END || '#' || id as url
    FROM chants 
    WHERE LOWER(name_hi) LIKE ? OR LOWER(name_en) LIKE ? OR LOWER(meaning_hi) LIKE ?
    LIMIT 5
  `).all(q, q, q);

  const gitas = db.prepare(`
    SELECT id, name_hi as title, name_en as subtitle, 'gita' as type, '/knowledge/gita#' || id as url
    FROM gitas 
    WHERE LOWER(name_hi) LIKE ? OR LOWER(name_en) LIKE ? OR LOWER(core_philosophy_hi) LIKE ?
    LIMIT 5
  `).all(q, q, q);

  return [...deities, ...temples, ...chants, ...gitas];
}
