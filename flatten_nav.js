const fs = require('fs');
const path = require('path');

const dir = __dirname;
const replacement = `<li><a href="index.html#services">Small Business</a></li>
          <li><a href="consulting.html">Enterprise</a></li>
          <li><a href="training.html">Training</a></li>`;

const regex = /<li class="dropdown">[\s\S]*?<\/ul>\s*<\/li>/g;

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.match(regex)) {
      content = content.replace(regex, replacement);
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    }
  }
});
