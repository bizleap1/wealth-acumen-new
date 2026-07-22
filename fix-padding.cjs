const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'src', 'components'),
  path.join(__dirname, 'src', 'pages'),
  path.join(__dirname, 'src')
];

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Replace common huge padding values
      const replacements = [
        { from: /padding: 100px/g, to: 'padding: 60px' },
        { from: /padding: 120px/g, to: 'padding: 60px' },
        { from: /padding: 140px/g, to: 'padding: 80px' },
        { from: /padding: 160px/g, to: 'padding: 80px' },
        { from: /padding: 80px/g, to: 'padding: 40px' }
      ];

      for (const { from, to } of replacements) {
        if (from.test(content)) {
          content = content.replace(from, to);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated padding in ${fullPath}`);
      }
    }
  }
}

dirs.forEach(processDirectory);
console.log('Done!');
