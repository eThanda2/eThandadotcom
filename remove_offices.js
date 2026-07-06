const fs = require('fs');
const path = require('path');

const dir = __dirname;
const regex1 = /<li>\s*<a href="global-offices\.html"[^>]*>Global Offices<\/a>\s*<\/li>/;
const regex2 = /<li>\s*<a href='\/global-offices'[^>]*>Global Offices<\/a>\s*<\/li>/;

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace only the FIRST occurrence (in the top nav) to preserve the footer link
    if (content.match(regex1)) {
      content = content.replace(regex1, '');
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    } else if (content.match(regex2)) {
      content = content.replace(regex2, '');
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    }
  }
});
