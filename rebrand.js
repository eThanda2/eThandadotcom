const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Protect the header logo from replacement
    const headerRegex = /(<a href="index.html" class="logo"[^>]*>[\s\S]*?<\/a>)/gi;
    let placeholders = [];
    content = content.replace(headerRegex, (match) => {
        placeholders.push(match);
        return `___HEADER_PLACEHOLDER_${placeholders.length - 1}___`;
    });
    
    // Protect the footer logo in index.html (already changed to eT Tech, but just in case)
    const footerRegex = /(<div class="footer-brand">[\s\S]*?<\/div>)/gi;
    let footerPlaceholders = [];
    content = content.replace(footerRegex, (match) => {
        footerPlaceholders.push(match);
        return `___FOOTER_PLACEHOLDER_${footerPlaceholders.length - 1}___`;
    });
    
    // Replace names globally
    content = content.replace(/eThanda Technologies/g, 'eT Tech');
    content = content.replace(/eThanda/g, 'eT Tech');
    
    // Fix double replacements if they occurred
    content = content.replace(/eT Tech Technologies/g, 'eT Tech');
    
    // Restore protected sections
    placeholders.forEach((placeholder, index) => {
        content = content.replace(`___HEADER_PLACEHOLDER_${index}___`, placeholder);
    });
    
    footerPlaceholders.forEach((placeholder, index) => {
        content = content.replace(`___FOOTER_PLACEHOLDER_${index}___`, placeholder);
    });
    
    fs.writeFileSync(file, content);
    console.log(`Rebranded ${file}`);
});
