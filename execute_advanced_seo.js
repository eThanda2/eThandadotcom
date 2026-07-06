const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\selva\\OneDrive\\Documents\\eThandadotcom';
const baseUrl = 'https://www.ethanda.com';

const smbPages = ['index.html', 'smb-services.html', 'tech-audit.html', 'contact.html'];

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.html')) {
    let filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. INJECT CANONICAL URL
    const canonicalUrl = file === 'index.html' ? baseUrl + '/' : `${baseUrl}/${file}`;
    if (!html.includes('<link rel="canonical"')) {
      const canonicalTag = `\n  <link rel="canonical" href="${canonicalUrl}">\n</head>`;
      html = html.replace('</head>', canonicalTag);
      changed = true;
    }

    // 2. REWRITE OG TAGS (Only for SMB pages)
    if (smbPages.includes(file)) {
      if (html.includes('property="og:title"')) {
        html = html.replace(/<meta property="og:title" content="[^"]*">/g, '<meta property="og:title" content="Save Time & Get More Leads | eThanda Technologies">');
        html = html.replace(/<meta property="og:description" content="[^"]*">/g, '<meta property="og:description" content="We handle the entire tech stack for growing businesses. Custom websites, lead generation tools, and automation.">');
        changed = true;
      } else {
        // Inject if missing
        const ogTags = `
  <meta property="og:title" content="Save Time & Get More Leads | eThanda Technologies">
  <meta property="og:description" content="We handle the entire tech stack for growing businesses. Custom websites, lead generation tools, and automation.">
  <meta property="og:image" content="https://www.ethanda.com/logo.png">
  <meta property="og:type" content="website">\n</head>`;
        html = html.replace('</head>', ogTags);
        changed = true;
      }
    }

    // 3. INJECT MISSING ALT TAGS
    const imgRegex = /<img\b([^>]*)>/gi;
    html = html.replace(imgRegex, (match, attrs) => {
      if (!attrs.toLowerCase().includes('alt=')) {
        changed = true;
        return `<img ${attrs} alt="eThanda Technologies">`;
      }
      return match;
    });

    if (changed) {
      fs.writeFileSync(filePath, html);
      console.log(`Updated SEO/Social tags in ${file}`);
    }
  }
});
console.log('Finished executing advanced SEO updates.');
