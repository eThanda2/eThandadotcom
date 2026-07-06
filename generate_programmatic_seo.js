const fs = require('fs');
const path = require('path');

const cities = [
    'Houston', 'Dallas', 'Austin', 'San Antonio',
    'Chicago', 'Miami', 'Atlanta', 'New York',
    'Los Angeles', 'Denver', 'Seattle', 'Phoenix'
];

const templateFile = path.join(__dirname, 'smb-services.html');
let template = fs.readFileSync(templateFile, 'utf8');

const sitemapFile = path.join(__dirname, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapFile, 'utf8');

cities.forEach(city => {
    const slug = `it-services-${city.toLowerCase().replace(/\s+/g, '-')}.html`;
    
    // Customize Content
    let content = template.replace(
        /<title>.*?<\/title>/, 
        `<title>IT Services & Web Design in ${city} | eT Tech</title>`
    );
    
    content = content.replace(
        /<meta name="description" content=".*?">/,
        `<meta name="description" content="Top-rated IT management and web design services for small businesses in ${city}. We handle your tech so you can handle your business.">`
    );
    
    // Replace the main H1 
    content = content.replace(
        /<h1[^>]*>We handle the tech\. You handle the business\.<\/h1>/,
        `<h1 style="color: var(--text-primary); margin-top: 1rem; font-size: 3.5rem;">${city}'s Premier Tech Partner for Small Businesses</h1>`
    );
    
    // Update canonical link
    content = content.replace(
        /<link rel="canonical" href="https:\/\/www\.ethanda\.com\/smb-services\.html">/,
        `<link rel="canonical" href="https://www.ethanda.com/${slug}">`
    );
    
    fs.writeFileSync(path.join(__dirname, slug), content);
    console.log(`Generated: ${slug}`);
    
    // Add to sitemap if not already there
    if (!sitemap.includes(`<loc>https://www.ethanda.com/${slug}</loc>`)) {
        const urlEntry = `
  <url>
    <loc>https://www.ethanda.com/${slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.7</priority>
  </url>
</urlset>`;
        sitemap = sitemap.replace('</urlset>', urlEntry);
    }
});

fs.writeFileSync(sitemapFile, sitemap);
console.log('Sitemap updated with all programmatic SEO pages.');
