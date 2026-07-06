const fs = require('fs');
const path = require('path');

const indexPath = 'c:\\Users\\selva\\OneDrive\\Documents\\eThandadotcom\\index.html';
let content = fs.readFileSync(indexPath, 'utf8');

// Update Title
content = content.replace(
  '<title>eThanda Technologies – Enterprise IT Consulting</title>',
  '<title>eThanda Technologies | AS400 Consulting & Small Business Tech Audits</title>'
);

// Update Meta Description
content = content.replace(
  '<meta name="description" content="eThanda Technologies is a premier IT consulting firm specializing in Enterprise Modernization, Small Business Websites, and Corporate Training.">',
  '<meta name="description" content="eThanda Technologies delivers enterprise AS400 modernization and provides affordable tech audits, AI implementation, and workflow automation for small businesses.">'
);

// In case the old meta description was different, let's use a regex to be safe
content = content.replace(
  /<meta name="description" content=".*?">/g,
  '<meta name="description" content="eThanda Technologies delivers enterprise AS400 modernization and provides affordable tech audits, AI implementation, and workflow automation for small businesses.">'
);

fs.writeFileSync(indexPath, content);
console.log('Successfully optimized index.html meta tags');
