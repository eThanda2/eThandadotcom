const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\selva\\OneDrive\\Documents\\eThandadotcom';

const indexFile = path.join(dir, 'index.html');
let indexHtml = fs.readFileSync(indexFile, 'utf8');

// Update Hero Section
const oldHeroList = `        <ul style="list-style: none; margin-bottom: 0; color: var(--text-primary); display: flex; flex-direction: column; gap: 1rem; font-size: 1.1rem;">
          <li><i class="fa-solid fa-shop" style="color: var(--accent-cyan); margin-right: 12px; width: 24px;"></i> <strong>E-Commerce & Shopify Setup</strong> - Beautiful stores to sell your custom products</li>
          <li><i class="fa-solid fa-laptop-code" style="color: var(--accent-cyan); margin-right: 12px; width: 24px;"></i> <strong>Small Business Websites <span style="background: rgba(168,85,247,0.15); color: var(--accent-purple); padding: 2px 8px; border-radius: 12px; font-size: 0.9em; margin-left: 6px;">Starts at $99</span></strong> - Get your local brand on the map</li>
          <li><i class="fa-solid fa-gears" style="color: var(--accent-cyan); margin-right: 12px; width: 24px;"></i> <strong>Workflow Automation</strong> - Ditch the messy spreadsheets</li>
          <li><i class="fa-solid fa-microchip" style="color: var(--accent-cyan); margin-right: 12px; width: 24px;"></i> <strong><a href="tech-audit.html" style="color: var(--text-primary); text-decoration: none;">AI & Tech Audits <i class="fa-solid fa-arrow-right" style="font-size: 0.8em; margin-left: 5px; color: var(--accent-cyan);"></i></a></strong> - We analyze your tools and recommend AI for maximum ROI</li>
        </ul>`;

const newHeroList = `        <ul style="list-style: none; margin-bottom: 0; color: var(--text-primary); display: flex; flex-direction: column; gap: 1rem; font-size: 1.1rem;">
          <li><i class="fa-solid fa-laptop-code" style="color: var(--accent-cyan); margin-right: 12px; width: 24px;"></i> <strong>Small Business Websites <span style="background: rgba(168,85,247,0.15); color: var(--accent-purple); padding: 2px 8px; border-radius: 12px; font-size: 0.9em; margin-left: 6px;">Starts at $99</span></strong> - Get your local brand on the map</li>
          <li><i class="fa-solid fa-shop" style="color: var(--accent-cyan); margin-right: 12px; width: 24px;"></i> <strong>E-Commerce & Shopify Setup</strong> - Beautiful stores to sell your custom products</li>
          <li><i class="fa-solid fa-scissors" style="color: var(--accent-cyan); margin-right: 12px; width: 24px;"></i> <strong>Software Cleanup & Cost Cutting</strong> - Stop paying for 5 overlapping subscriptions</li>
          <li><i class="fa-solid fa-comment-sms" style="color: var(--accent-cyan); margin-right: 12px; width: 24px;"></i> <strong>Automated Customer Follow-ups</strong> - Never lose a lead to a missed call again</li>
          <li><i class="fa-solid fa-microchip" style="color: var(--accent-cyan); margin-right: 12px; width: 24px;"></i> <strong><a href="tech-audit.html" style="color: var(--text-primary); text-decoration: none;">AI & Tech Audits <i class="fa-solid fa-arrow-right" style="font-size: 0.8em; margin-left: 5px; color: var(--accent-cyan);"></i></a></strong> - Discover how smart tech can save you 10+ hours a week</li>
        </ul>`;

indexHtml = indexHtml.replace(oldHeroList, newHeroList);
fs.writeFileSync(indexFile, indexHtml);

// Update Form Dropdowns on all pages
const filesWithForms = ['index.html', 'tech-audit.html', 'contact.html'];
const oldOptions = `<option>E-Commerce & Shopify Setup</option>
              <option>New Small Business Website</option>
              <option>Workflow/Spreadsheet Automation</option>
              <option>Other / General IT</option>`;
              
const newOptions = `<option>New Small Business Website</option>
              <option>E-Commerce & Shopify Setup</option>
              <option>Software Cleanup / Cost Cutting</option>
              <option>Automated Customer Follow-ups</option>
              <option>Custom Tracking App / AI Assistant</option>
              <option>Other / I just need help</option>`;

filesWithForms.forEach(file => {
  const filePath = path.join(dir, file);
  if(fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(oldOptions, newOptions);
    fs.writeFileSync(filePath, content);
  }
});

console.log('Successfully updated Hero list and Form Dropdowns.');
