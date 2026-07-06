const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    const targetLink = `<li><a href="training.html">MKS X-Analysis Configuration</a></li>`;
    const replacementHtml = `<li><a href="training.html">MKS Configuration</a></li>
              <li><a href="training.html">X-Analysis Configuration</a></li>`;

    if (content.includes(targetLink)) {
        content = content.replace(targetLink, replacementHtml);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated Training dropdown in ${file}`);
    }
});
console.log('Training dropdown fixed across all HTML files.');
