const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Fix Footer Placeholder Bug
    content = content.replace(/___HEADER_PLACEHOLDER_1___/g, '<a href="index.html" class="logo" style="margin-bottom: 1.5rem; display: inline-block; font-size: 2rem; font-weight: 900; color: var(--text-primary); text-decoration: none; font-family: \'Outfit\', sans-serif;"><span style="color: var(--accent-cyan);">eT</span> Tech</a>');
    
    // 2. Replace Small Business link with Dropdown
    const newNav = `<li class="dropdown">
            <a href="smb-services.html" style="cursor: pointer;">Small Business <i class="fa-solid fa-chevron-down" style="font-size: 0.8em; margin-left: 4px;"></i></a>
            <ul class="dropdown-menu">
              <li><a href="smb-services.html">Custom Websites & SEO</a></li>
              <li><a href="smb-services.html">Automated Follow-Ups</a></li>
              <li><a href="smb-services.html">E-Commerce & Shopify</a></li>
              <li><a href="tech-audit.html">Tech & Software Cleanup</a></li>
            </ul>
          </li>`;
    
    const navRegex = /<li>\s*<a href="index\.html#services">Small Business<\/a>\s*<\/li>/g;
    content = content.replace(navRegex, newNav);
    
    // 3. Fix the extraneous closing tags bug in some HTML files
    content = content.replace(/<\/ul>\s*<\/li>\s*<\/ul>\s*<\/nav>/g, '</ul>\n      </nav>');
    
    fs.writeFileSync(file, content);
    console.log(`Processed ${file}`);
});
console.log("Fixed nav and footer across all HTML files!");
