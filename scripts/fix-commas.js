const fs = require('fs');
let c = fs.readFileSync('src/data/temples.ts', 'utf-8');

// Fix lines where a _hi field follows but the previous line has no trailing comma
// Pattern: property_name: 'value'\n  (without comma before the _hi line)

// elderly_support_notes missing comma
let fixes = 0;
c = c.replace(/elderly_support_notes: '([^']+)'\n(\s+elderly_support_notes_hi:)/g, (m, val, rest) => {
  fixes++;
  return `elderly_support_notes: '${val}',\n${rest}`;
});
console.log(`Fixed ${fixes} elderly_support_notes commas`);

// deity_name missing comma
fixes = 0;
c = c.replace(/deity_name: '([^']+)'\n(\s+deity_name_hi:)/g, (m, val, rest) => {
  fixes++;
  return `deity_name: '${val}',\n${rest}`;
});
console.log(`Fixed ${fixes} deity_name commas`);

// best_time missing comma
fixes = 0;
c = c.replace(/best_time: '([^']+)'\n(\s+best_time_hi:)/g, (m, val, rest) => {
  fixes++;
  return `best_time: '${val}',\n${rest}`;
});
console.log(`Fixed ${fixes} best_time commas`);

fs.writeFileSync('src/data/temples.ts', c);
console.log('Done');
