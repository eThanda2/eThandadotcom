const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Target 1: Small Business Dropdown
    const smbTarget = `<li><a href="tech-audit.html">Tech & Software Cleanup</a></li>`;
    const smbReplacement = `<li><a href="tech-audit.html">Tech & Software Cleanup</a></li>
              <li><a href="smb-services.html">AI Implementation</a></li>`;

    if (content.includes(smbTarget)) {
        content = content.replace(smbTarget, smbReplacement);
    }

    // Target 2: Enterprise Dropdown
    const entTarget = `<li><a href="consulting.html">Legacy Support</a></li>`;
    const entReplacement = `<li><a href="consulting.html">Legacy Support</a></li>
              <li><a href="java-fullstack.html">Full Stack Development</a></li>`;

    if (content.includes(entTarget)) {
        content = content.replace(entTarget, entReplacement);
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated navigation in ${file}`);
});
console.log('AI Implementation and Full Stack Development added to dropdowns globally.');
