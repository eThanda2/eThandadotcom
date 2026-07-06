const fs = require('fs');
const path = require('path');

const appJsPath = 'c:\\Users\\selva\\OneDrive\\Documents\\eThandadotcom\\app.js';

const schemaCode = `

/* ==========================================
   AI & SEO STRUCTURED DATA (JSON-LD)
   ========================================== */
document.addEventListener("DOMContentLoaded", function() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.ethanda.com/#organization",
        "name": "eThanda Technologies",
        "url": "https://www.ethanda.com",
        "logo": "https://www.ethanda.com/logo.png",
        "sameAs": [],
        "description": "Enterprise IT Consulting specializing in AS400 modernization, Java Full Stack Development, and Small Business AI & Tech Audits."
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.ethanda.com/#localbusiness",
        "name": "eThanda Technologies",
        "url": "https://www.ethanda.com",
        "telephone": "+1-346-382-5020",
        "email": "contactus@ethanda.com",
        "image": "https://www.ethanda.com/logo.png",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "US"
        },
        "priceRange": "$$",
        "description": "Providing high-end IT infrastructure consulting and specialized small business website and automation solutions."
      }
    ]
  };

  // Only inject if it doesn't already exist
  if (!document.querySelector('script[type="application/ld+json"]')) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }
});
`;

fs.appendFileSync(appJsPath, schemaCode);
console.log('Successfully injected AI Schema Data into app.js');
