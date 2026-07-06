const fs = require('fs');
const path = require('path');

const dir = __dirname;
const replacement = `<ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="index.html#services">Small Business</a></li>
          <li><a href="training.html">Training</a></li>
          <li><a href="consulting.html">Enterprise</a></li>
          <li><a href="careers.html">Careers</a></li>
          <li class="dropdown">
            <a style="cursor: pointer;">Corporate <i class="fa-solid fa-chevron-down" style="font-size: 0.8em; margin-left: 4px;"></i></a>
            <ul class="dropdown-menu">
              <li><a href="corporate.html">About Us</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </li>
        </ul>`;

const regex = /<ul class="nav-links">[\s\S]*?<\/ul>/;

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
