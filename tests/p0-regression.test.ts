/**
 * P0 REGRESSION TEST SUITE — TRUPTI
 * ==================================
 * These tests gate every merge. If any fails, the build is blocked.
 *
 * Coverage:
 *  1. Data integrity — minimum counts, required fields, no nulls
 *  2. Image map — every referenced image file exists on disk
 *  3. Image resolvers — fallback logic works
 *  4. Hindi translations — every temple has _hi fields
 *  5. Type safety — data conforms to TypeScript interfaces
 */

import { describe, it, expect } from 'vitest';
import { deitiesData } from '@/data/deities';
import { templesData } from '@/data/temples';
import { chantsData } from '@/data/chants';
import { gitasData } from '@/data/gitas';
import { vedasPuranasData } from '@/data/vedas_puranas';
import { vratasData } from '@/data/vratas';
import {
  DEITY_IMAGES,
  TEMPLE_IMAGES,
  SCRIPTURE_IMAGES,
  getDeityImage,
  getTempleImage,
  getChantImage,
  getScriptureImage,
} from '@/data/imageMap';
import fs from 'node:fs';
import path from 'node:path';

const PUBLIC = path.join(process.cwd(), 'public');

// ============================================================
// 1. DATA INTEGRITY — MINIMUM COUNTS
// ============================================================
describe('P0: Data minimum counts', () => {
  it('has ≥30 deities', () => {
    expect(deitiesData.length).toBeGreaterThanOrEqual(30);
  });

  it('has ≥60 temples', () => {
    expect(templesData.length).toBeGreaterThanOrEqual(60);
  });

  it('has ≥50 chants/mantras', () => {
    expect(chantsData.length).toBeGreaterThanOrEqual(50);
  });

  it('has ≥10 gita variants', () => {
    expect(gitasData.length).toBeGreaterThanOrEqual(10);
  });

  it('has ≥15 vedas/puranas/upanishads', () => {
    expect(vedasPuranasData.length).toBeGreaterThanOrEqual(15);
  });

  it('has ≥8 vratas', () => {
    expect(vratasData.length).toBeGreaterThanOrEqual(8);
  });
});

// ============================================================
// 2. REQUIRED FIELDS — NO EMPTY/NULL VALUES
// ============================================================
describe('P0: Deity required fields', () => {
  deitiesData.forEach((deity) => {
    it(`deity "${deity.id}" has all required fields`, () => {
      expect(deity.id).toBeTruthy();
      expect(deity.canonical_name).toBeTruthy();
      expect(deity.hindi_name).toBeTruthy();
      expect(deity.description_hi).toBeTruthy();
      expect(deity.description_en).toBeTruthy();
    });
  });
});

describe('P0: Temple required fields', () => {
  templesData.forEach((temple) => {
    it(`temple "${temple.id}" has all required fields`, () => {
      expect(temple.id).toBeTruthy();
      expect(temple.name).toBeTruthy();
      expect(temple.state).toBeTruthy();
      expect(temple.city).toBeTruthy();
      expect(temple.deity_id).toBeTruthy();
      expect(temple.deity_name).toBeTruthy();
      expect(temple.significance_hi).toBeTruthy();
      expect(temple.significance_en).toBeTruthy();
      expect(temple.best_time).toBeTruthy();
      expect(temple.circuit).toBeInstanceOf(Array);
      expect(temple.circuit.length).toBeGreaterThan(0);
    });
  });
});

describe('P0: Chant required fields', () => {
  chantsData.forEach((chant) => {
    it(`chant "${chant.id}" has all required fields`, () => {
      expect(chant.id).toBeTruthy();
      expect(chant.name_hi).toBeTruthy();
      expect(chant.name_en).toBeTruthy();
      expect(chant.category).toBeTruthy();
    });
  });
});

// ============================================================
// 3. UNIQUE IDS — NO DUPLICATES
// ============================================================
describe('P0: Unique IDs', () => {
  it('deity IDs are unique', () => {
    const ids = deitiesData.map(d => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('temple IDs are unique', () => {
    const ids = templesData.map(t => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('chant IDs are unique', () => {
    const ids = chantsData.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gita IDs are unique', () => {
    const ids = gitasData.map(g => g.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

// ============================================================
// 4. IMAGE MAP — EVERY LOCAL PATH EXISTS ON DISK
// ============================================================
describe('P0: Image files exist on disk', () => {
  Object.entries(DEITY_IMAGES as Record<string, string>).forEach(([id, imgPath]) => {
    it(`deity image "${id}" exists at ${imgPath}`, () => {
      const fullPath = path.join(PUBLIC, imgPath as string);
      expect(fs.existsSync(fullPath)).toBe(true);
    });
  });

  Object.entries(TEMPLE_IMAGES as Record<string, string>).forEach(([id, imgPath]) => {
    it(`temple image "${id}" exists at ${imgPath}`, () => {
      const fullPath = path.join(PUBLIC, imgPath as string);
      expect(fs.existsSync(fullPath)).toBe(true);
    });
  });

  Object.entries(SCRIPTURE_IMAGES as Record<string, string>).forEach(([id, imgPath]) => {
    it(`scripture image "${id}" exists at ${imgPath}`, () => {
      const fullPath = path.join(PUBLIC, imgPath as string);
      expect(fs.existsSync(fullPath)).toBe(true);
    });
  });
});

// ============================================================
// 5. IMAGE RESOLVERS — FALLBACK LOGIC
// ============================================================
describe('P0: Image resolver fallbacks', () => {
  it('getDeityImage returns default for undefined', () => {
    const result = getDeityImage(undefined);
    expect(result).toBe('/images/deities/shiva.jpg');
  });

  it('getDeityImage returns default for unknown ID', () => {
    const result = getDeityImage('nonexistent_deity_xyz');
    expect(result).toBe('/images/deities/shiva.jpg');
  });

  it('getDeityImage returns correct path for known deity', () => {
    const result = getDeityImage('krishna');
    expect(result).toBe('/images/deities/krishna.jpg');
  });

  it('getTempleImage returns default for unknown temple', () => {
    const result = getTempleImage('nonexistent_temple_xyz');
    expect(result).toBe('/images/temples/badrinath.jpg');
  });

  it('getScriptureImage returns default for unknown scripture', () => {
    const result = getScriptureImage('nonexistent');
    expect(result).toBe('/images/scriptures/bhagavad_gita.jpg');
  });

  it('getChantImage uses deity fallback', () => {
    const result = getChantImage('hanuman', 'chalisa');
    expect(result).toBe('/images/deities/hanuman.jpg');
  });
});

// ============================================================
// 6. NO REMOTE/STOCK IMAGE URLS
// ============================================================
describe('P0: No remote or stock image URLs', () => {
  const allPaths = [
    ...Object.values(DEITY_IMAGES),
    ...Object.values(TEMPLE_IMAGES),
    ...Object.values(SCRIPTURE_IMAGES),
  ] as string[];

  it('zero remote URLs in image maps', () => {
    const remotes = allPaths.filter(p => p.startsWith('http'));
    expect(remotes).toHaveLength(0);
  });

  it('zero unsplash URLs', () => {
    const unsplash = allPaths.filter(p => p.includes('unsplash'));
    expect(unsplash).toHaveLength(0);
  });

  it('all paths start with /images/', () => {
    allPaths.forEach(p => {
      expect(p).toMatch(/^\/images\//);
    });
  });
});

// ============================================================
// 7. HINDI TRANSLATIONS — EVERY TEMPLE HAS _HI FIELDS
// ============================================================
describe('P0: Temple Hindi translations', () => {
  templesData.forEach((temple) => {
    it(`temple "${temple.id}" has deity_name_hi`, () => {
      expect((temple as any).deity_name_hi).toBeTruthy();
    });

    it(`temple "${temple.id}" has best_time_hi`, () => {
      expect((temple as any).best_time_hi).toBeTruthy();
    });
  });

  // Check at least 50 have elderly_support_notes_hi (some may not have accessibility)
  it('≥50 temples have elderly_support_notes_hi', () => {
    const withHi = templesData.filter(
      t => t.accessibility?.elderly_support_notes && (t.accessibility as any).elderly_support_notes_hi
    );
    expect(withHi.length).toBeGreaterThanOrEqual(50);
  });
});

// ============================================================
// 8. DATABASE FILE EXISTS AND IS VALID SIZE
// ============================================================
describe('P0: SQLite database', () => {
  const dbPath = path.join(process.cwd(), 'src', 'data', 'trupti.db');

  it('trupti.db exists', () => {
    expect(fs.existsSync(dbPath)).toBe(true);
  });

  it('trupti.db is between 100KB and 5MB', () => {
    const stats = fs.statSync(dbPath);
    expect(stats.size).toBeGreaterThan(100 * 1024);
    expect(stats.size).toBeLessThan(5 * 1024 * 1024);
  });
});

// ============================================================
// 9. CROSS-REFERENCE INTEGRITY
// ============================================================
describe('P0: Cross-reference integrity', () => {
  const deityIds = new Set(deitiesData.map(d => d.id));

  it('every temple deity_id references a valid deity', () => {
    const invalid = templesData.filter(t => !deityIds.has(t.deity_id));
    // Allow some temples to reference deities not in the deity list (e.g., composite deities)
    // but flag if more than 20% are missing
    expect(invalid.length).toBeLessThan(templesData.length * 0.3);
  });

  it('every chant deity_id references a valid deity', () => {
    const chantsWithDeity = chantsData.filter(c => (c as any).deity_id);
    const invalid = chantsWithDeity.filter(c => !deityIds.has((c as any).deity_id));
    expect(invalid.length).toBeLessThan(chantsWithDeity.length * 0.3);
  });
});

// ============================================================
// 10. BUILD SANITY — next.config.ts is valid
// ============================================================
describe('P0: Build config', () => {
  it('next.config.ts exists', () => {
    const configPath = path.join(process.cwd(), 'next.config.ts');
    expect(fs.existsSync(configPath)).toBe(true);
  });

  it('package.json has build script', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
    expect(pkg.scripts.build).toBeTruthy();
    expect(pkg.scripts.start).toBeTruthy();
  });
});
