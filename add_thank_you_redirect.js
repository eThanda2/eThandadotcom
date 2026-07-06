const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find all formspree forms and inject the hidden _next input right after the <form> opening tag
    if (content.includes('formspree.io')) {
        const formTagRegex = /(<form[^>]*action=["']https:\/\/formspree\.io[^>]*>)/gi;
        
        // Check if it already has a _next input to avoid duplicates
        if (!content.includes('name="_next"')) {
            content = content.replace(formTagRegex, '$1\n        <input type="hidden" name="_next" value="https://ethanda.com/thank-you.html">');
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Added redirect to ${file}`);
        }
    }
});
console.log('Formspree redirect updates complete.');
