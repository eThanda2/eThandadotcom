const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

const baseSchema = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.ethanda.com/#organization",
        "name": "eT Tech",
        "legalName": "eThanda Technologies",
        "url": "https://www.ethanda.com",
        "logo": "https://www.ethanda.com/logo.png",
        "description": "Small Business Tech Solutions & Enterprise AS400 Modernization."
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.ethanda.com/#localbusiness",
        "name": "eT Tech",
        "telephone": "+1-346-382-5020",
        "email": "contactus@ethanda.com",
        "priceRange": "$$",
        "image": "https://www.ethanda.com/logo.png",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "US"
        }
      },
      {
        "@type": "Service",
        "name": "Small Business Website Design",
        "provider": { "@id": "https://www.ethanda.com/#organization" },
        "description": "Custom, blazing-fast websites starting at $99. Optimized for local SEO and lead conversion."
      },
      {
        "@type": "Service",
        "name": "Automated Follow-Ups",
        "provider": { "@id": "https://www.ethanda.com/#organization" },
        "description": "Never miss a lead. Instant SMS follow-ups for missed calls and form submissions."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does a small business website cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our small business web design services start at just $99. This includes a custom, SEO-optimized, blazing-fast website."
            }
          },
          {
            "@type": "Question",
            "name": "What is tech and software cleanup?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We audit your business software subscriptions, consolidate apps to save you money, and automate your workflow so everything talks to each other."
            }
          }
        ]
      }
    ]
  }
  </script>
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove old schema if exists
    content = content.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
    
    // Insert new schema before </head>
    content = content.replace('</head>', `${baseSchema}\n</head>`);
    
    fs.writeFileSync(file, content);
    console.log(`Injected Deep Schema into ${file}`);
});
console.log("Deep Schema injection complete!");
