const fs = require('fs');
const path = require('path');

const filesToFix = {
  'src/pages/MutualFunds.css': { from: /padding: 40px 10%;/, to: 'padding: 140px 10% 40px;' },
  'src/pages/Insurance.css': { from: /padding: 40px 10%;/, to: 'padding: 140px 10% 40px;' },
  'src/pages/ETF.css': { from: /padding: 40px 10%;/, to: 'padding: 140px 10% 40px;' },
  'src/pages/FAQs.css': { from: /padding: 60px 20px 80px;/, to: 'padding: 140px 20px 80px;' },
  'src/pages/DIY.css': { from: /padding: 80px 20px 100px;/, to: 'padding: 140px 20px 100px;' },
  'src/pages/AboutUs.css': { from: /padding: 80px 20px 100px;/, to: 'padding: 140px 20px 100px;' }
};

for (const [file, replacement] of Object.entries(filesToFix)) {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    // Only replace the first match to avoid changing other 40px 10% paddings
    content = content.replace(replacement.from, replacement.to);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed top padding for ${file}`);
  }
}
