import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { getDeityImage, getTempleImage, getChantImage, getScriptureImage } from '@/data/imageMap';

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

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'deity' | 'temple' | 'aarti' | 'chalisa' | 'stotra' | 'sukta' | 'gita' | 'veda' | 'purana' | 'upanishad' | 'vrat';
  url: string;
  image_url: string;
  badge: string;
}

export function searchAll(query: string): SearchResultItem[] {
  if (!query || query.trim().length === 0) return [];
  const db = getDatabase();
  const rawQ = query.trim().toLowerCase();
  const q = `%${rawQ}%`;

  const deitiesRaw = db.prepare(`
    SELECT id, hindi_name as title, canonical_name as subtitle, 'deity' as type, '/knowledge/deities#' || id as url
    FROM deities 
    WHERE LOWER(hindi_name) LIKE ? OR LOWER(canonical_name) LIKE ? OR LOWER(description_hi) LIKE ? OR LOWER(sanskrit_name) LIKE ?
    LIMIT 6
  `).all(q, q, q, q) as any[];

  const deities: SearchResultItem[] = deitiesRaw.map(d => ({
    ...d,
    image_url: getDeityImage(d.id),
    badge: '🕉️ देवता'
  }));

  const templesRaw = db.prepare(`
    SELECT id, name as title, city || ', ' || state as subtitle, 'temple' as type, '/journey/temples#' || id as url, deity_id
    FROM temples 
    WHERE LOWER(name) LIKE ? OR LOWER(sanskrit_name) LIKE ? OR LOWER(city) LIKE ? OR LOWER(state) LIKE ? OR LOWER(significance_hi) LIKE ?
    LIMIT 6
  `).all(q, q, q, q, q) as any[];

  const temples: SearchResultItem[] = templesRaw.map(t => ({
    id: t.id,
    title: t.title,
    subtitle: t.subtitle,
    type: 'temple',
    url: t.url,
    image_url: getTempleImage(t.id),
    badge: '🛕 तीर्थ व मंदिर'
  }));

  const chantsRaw = db.prepare(`
    SELECT id, name_hi as title, name_en as subtitle, category as type, deity_id,
      '/knowledge/' || CASE WHEN category = 'aarti' THEN 'aarti' WHEN category = 'chalisa' THEN 'chalisa' ELSE 'stotra' END || '#' || id as url
    FROM chants 
    WHERE LOWER(name_hi) LIKE ? OR LOWER(name_en) LIKE ? OR LOWER(meaning_hi) LIKE ?
    LIMIT 8
  `).all(q, q, q) as any[];

  const chants: SearchResultItem[] = chantsRaw.map(c => {
    let badge = '🔔 स्तोत्र व मंत्र';
    if (c.type === 'aarti') badge = '🪔 पावन आरती';
    else if (c.type === 'chalisa') badge = '🙏 चालीसा';
    return {
      id: c.id,
      title: c.title,
      subtitle: c.subtitle,
      type: c.type,
      url: c.url,
      image_url: getChantImage(c.deity_id, c.type),
      badge
    };
  });

  const gitasRaw = db.prepare(`
    SELECT id, name_hi as title, name_en as subtitle, 'gita' as type, '/knowledge/gita#' || id as url
    FROM gitas 
    WHERE LOWER(name_hi) LIKE ? OR LOWER(name_en) LIKE ? OR LOWER(core_philosophy_hi) LIKE ?
    LIMIT 5
  `).all(q, q, q) as any[];

  const gitas: SearchResultItem[] = gitasRaw.map(g => ({
    ...g,
    image_url: getScriptureImage(g.id),
    badge: '📖 गीता शास्त्र'
  }));

  const vedasRaw = db.prepare(`
    SELECT id, name_hi as title, name_en as subtitle, category as type, '/knowledge/vedas-puranas#' || id as url
    FROM vedas_puranas 
    WHERE LOWER(name_hi) LIKE ? OR LOWER(name_en) LIKE ? OR LOWER(overview_hi) LIKE ?
    LIMIT 5
  `).all(q, q, q) as any[];

  const vedas: SearchResultItem[] = vedasRaw.map(v => ({
    ...v,
    image_url: getScriptureImage(v.id),
    badge: v.type === 'veda' ? '📜 वेद' : v.type === 'purana' ? '📜 महापुराण' : '📜 उपनिषद'
  }));

  const vratasRaw = db.prepare(`
    SELECT id, name_hi as title, tithi_info as subtitle, 'vrat' as type, '/knowledge/vrat-sangrah#' || id as url, deity_id
    FROM vratas 
    WHERE LOWER(name_hi) LIKE ? OR LOWER(name_en) LIKE ? OR LOWER(significance_hi) LIKE ?
    LIMIT 5
  `).all(q, q, q) as any[];

  const vratas: SearchResultItem[] = vratasRaw.map(vr => ({
    id: vr.id,
    title: vr.title,
    subtitle: vr.subtitle || 'सनातन व्रत व उपवास नियम',
    type: 'vrat',
    url: vr.url,
    image_url: getDeityImage(vr.deity_id),
    badge: '🗓️ व्रत संग्रह'
  }));

  return [...deities, ...temples, ...chants, ...gitas, ...vedas, ...vratas];
}
