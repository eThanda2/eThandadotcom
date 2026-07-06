const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    const targetLink = '<li><a href="consulting.html">Enterprise</a></li>';
    const replacementHtml = `<li class="dropdown">
            <a href="consulting.html" style="cursor: pointer;">Enterprise <i class="fa-solid fa-chevron-down" style="font-size: 0.8em; margin-left: 4px;"></i></a>
            <ul class="dropdown-menu">
              <li><a href="consulting.html">AS400 Modernization</a></li>
              <li><a href="consulting.html">RPG Development</a></li>
              <li><a href="consulting.html">System Integration</a></li>
              <li><a href="consulting.html">Legacy Support</a></li>
            </ul>
          </li>`;

    if (content.includes(targetLink)) {
        content = content.replace(targetLink, replacementHtml);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated navigation in ${file}`);
    }
});
console.log('Enterprise dropdown added to all HTML files successfully.');
