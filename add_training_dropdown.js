const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    const targetLink = '<li><a href="training.html">Training</a></li>';
    const replacementHtml = `<li class="dropdown">
            <a href="training.html" style="cursor: pointer;">Training <i class="fa-solid fa-chevron-down" style="font-size: 0.8em; margin-left: 4px;"></i></a>
            <ul class="dropdown-menu">
              <li><a href="training.html">MKS X-Analysis Configuration</a></li>
              <li><a href="training.html">MIMIX Configuration</a></li>
            </ul>
          </li>`;

    if (content.includes(targetLink)) {
        content = content.replace(targetLink, replacementHtml);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated Training navigation in ${file}`);
    }
});
console.log('Training dropdown added to all HTML files successfully.');
