const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\selva\\OneDrive\\Documents\\eThandadotcom';

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.html')) {
    let filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Simple regex to add loading="lazy" if not present in <img> tags
    let changed = false;
    let newHtml = html.replace(/<img\b([^>]*)>/gi, (match, attrs) => {
      if (!attrs.includes('loading=')) {
        changed = true;
        return `<img ${attrs} loading="lazy">`;
      }
      return match;
    });

    if (changed) {
      fs.writeFileSync(filePath, newHtml);
      console.log(`Added lazy loading to images in ${file}`);
    }
  }
});
console.log('Finished updating images.');
