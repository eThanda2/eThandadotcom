const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\selva\\OneDrive\\Documents\\eThandadotcom';
const baseUrl = 'https://www.ethanda.com';

// 1. Create robots.txt
const robotsContent = `User-agent: *
Allow: /

# Explicitly invite AI search crawlers
User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

fs.writeFileSync(path.join(dir, 'robots.txt'), robotsContent);
console.log('Created robots.txt');

// 2. Create sitemap.xml dynamically
const files = fs.readdirSync(dir);
const htmlFiles = files.filter(f => f.endsWith('.html'));

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const today = new Date().toISOString().split('T')[0];

htmlFiles.forEach(file => {
    // index.html maps to the root
    let urlPath = file === 'index.html' ? '' : file;
    let priority = file === 'index.html' ? '1.0' : '0.8';
    
    // Lower priority for utility pages
    if (file === 'lca.html' || file === 'global-offices.html' || file === 'review.html') {
        priority = '0.5';
    }

    sitemapXml += `  <url>\n`;
    sitemapXml += `    <loc>${baseUrl}/${urlPath}</loc>\n`;
    sitemapXml += `    <lastmod>${today}</lastmod>\n`;
    sitemapXml += `    <priority>${priority}</priority>\n`;
    sitemapXml += `  </url>\n`;
});

sitemapXml += `</urlset>`;

fs.writeFileSync(path.join(dir, 'sitemap.xml'), sitemapXml);
console.log('Created sitemap.xml with ' + htmlFiles.length + ' pages');
