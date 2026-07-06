const fs = require('fs');
const path = require('path');

const dir = __dirname;
const replacement = `<li class="dropdown">
            <a style="cursor: pointer;">Services <i class="fa-solid fa-chevron-down" style="font-size: 0.8em; margin-left: 4px;"></i></a>
            <ul class="dropdown-menu">
              <li><a href="index.html#services">Small Business</a></li>
              <li><a href="consulting.html">Enterprise</a></li>
              <li><a href="training.html">Training</a></li>
            </ul>
          </li>`;

const regex1 = /<li><a href="consulting\.html">Services<\/a><\/li>/g;
const regex2 = /<li><a href='\/consulting'>Services<\/a><\/li>/g;

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.match(regex1) || content.match(regex2)) {
      content = content.replace(regex1, replacement).replace(regex2, replacement);
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    }
  }
});
