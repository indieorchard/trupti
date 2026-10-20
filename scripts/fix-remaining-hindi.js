const fs = require('fs');
let c = fs.readFileSync('src/data/temples.ts', 'utf-8');

// Fix the curly quote issue and add deity_name_hi
const target = "deity_name: 'Lord Shiva & World\u2019s 2nd Tallest Shiva Statue',";
const replacement = "deity_name: 'Lord Shiva & World\\'s 2nd Tallest Shiva Statue',\n    deity_name_hi: '\u092D\u0917\u0935\u093E\u0928 \u0936\u093F\u0935 \u090F\u0935\u0902 \u0935\u093F\u0936\u094D\u0935 \u0915\u0940 \u0926\u0942\u0938\u0930\u0940 \u0938\u092C\u0938\u0947 \u090A\u0901\u091A\u0940 \u0936\u093F\u0935 \u092A\u094D\u0930\u0924\u093F\u092E\u093E',";

if (c.includes(target)) {
  c = c.replace(target, replacement);
  console.log('Fixed curly quote deity_name');
} else {
  console.log('Target not found - checking for alternate forms');
  // Try to find and fix it by line
  const lines = c.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('World') && lines[i].includes('Tallest Shiva') && lines[i].includes('deity_name')) {
      console.log('Found at line', i+1, ':', lines[i].trim());
      // Check if next line already has deity_name_hi
      if (i+1 < lines.length && lines[i+1].includes('deity_name_hi')) {
        console.log('Already has deity_name_hi');
      } else {
        const indent = lines[i].match(/^(\s*)/)[1];
        lines.splice(i+1, 0, indent + "deity_name_hi: '\u092D\u0917\u0935\u093E\u0928 \u0936\u093F\u0935 \u090F\u0935\u0902 \u0935\u093F\u0936\u094D\u0935 \u0915\u0940 \u0926\u0942\u0938\u0930\u0940 \u0938\u092C\u0938\u0947 \u090A\u0901\u091A\u0940 \u0936\u093F\u0935 \u092A\u094D\u0930\u0924\u093F\u092E\u093E',");
        console.log('Added deity_name_hi after line', i+1);
      }
      break;
    }
  }
  c = lines.join('\n');
}

// Now find the missing best_time
const btLines = c.split('\n');
let missingBt = [];
for (let i = 0; i < btLines.length; i++) {
  const m = btLines[i].match(/best_time:\s*'([^']+)'/);
  if (m && (i+1 >= btLines.length || !btLines[i+1].includes('best_time_hi'))) {
    missingBt.push({line: i+1, val: m[1]});
  }
}
if (missingBt.length > 0) {
  console.log('\nMissing best_time_hi:');
  missingBt.forEach(m => console.log(`  Line ${m.line}: ${m.val}`));
}

fs.writeFileSync('src/data/temples.ts', c);

// Final count
const final = fs.readFileSync('src/data/temples.ts', 'utf-8');
console.log('\nFinal counts:');
console.log('deity_name_hi:', (final.match(/deity_name_hi/g) || []).length);
console.log('best_time_hi:', (final.match(/best_time_hi/g) || []).length);
console.log('elderly_support_notes_hi:', (final.match(/elderly_support_notes_hi/g) || []).length);
