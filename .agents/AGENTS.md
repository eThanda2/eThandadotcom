# Marketing and SEO Dependency Synchronization Rule

Whenever making updates to marketing copy, branding, or target audience terminology, you MUST strictly ensure that all related dependencies across the project are synchronized. Do not rely on the user to track these dependencies.

Specifically, verify and update:
1. **Raw HTML Meta Tags**: `<meta name="description">` and Open Graph (`<meta property="og:description">`, etc.) tags in HTML files like `index.html` and `smb-services.html`.
2. **Structured Data**: JSON-LD schema metadata (often found in `app.js` or inline script tags).
3. **Generated Assets**: Any programmatic PDF generation scripts (e.g., `generate_smb_brochure.js`, `generate_et_tech_marketing_kit.js`) that inject marketing copy.

Always perform a project-wide search to ensure no straggler references are missed.
