const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\selva\\OneDrive\\Documents\\eThandadotcom';

// Use tech-audit.html as a template for the new smb-services.html
let html = fs.readFileSync(path.join(dir, 'tech-audit.html'), 'utf8');

// Replace Title & Meta
html = html.replace('<title>AI & Tech Audits for Small Business | eThanda Technologies</title>', '<title>Complete Tech Management for Growing Businesses | eThanda Technologies</title>');
html = html.replace('<meta name="description" content="eThanda Technologies provides Tech Audits and AI Implementation strategies for small businesses to automate workflows, consolidate software, and maximize ROI.">', '<meta name="description" content="We handle the entire tech stack for businesses under $10M in revenue. You run your business, we handle the technology.">');

// Replace Hero Section
const oldHero = `<h1 style="color: var(--text-primary); margin-top: 1rem; font-size: 3.5rem;">Get Your <span class="gradient-text">Weekends Back.</span></h1>
        <p style="color: var(--text-secondary); margin-bottom: 2rem; max-width: 650px; font-size: 1.15rem; line-height: 1.7;">Most small business owners are drowning in administrative work, messy spreadsheets, and overlapping software subscriptions. We fix that.</p>
        <div style="display: flex; justify-content: center; gap: 1rem;">
          <a href="#book-audit" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem;">Get a Free Tech Audit <i class="fa-solid fa-arrow-right"></i></a>
        </div>`;

const newHero = `<h1 style="color: var(--text-primary); margin-top: 1rem; font-size: 3.5rem;">We handle the tech.<br><span class="gradient-text">You run the business.</span></h1>
        <p style="color: var(--text-secondary); margin-bottom: 2rem; max-width: 650px; font-size: 1.15rem; line-height: 1.7;">Built specifically for businesses under $10M in revenue. You didn't start your business to become an IT expert, manage software subscriptions, or build websites. That's our job.</p>
        <div style="display: flex; justify-content: center; gap: 1rem;">
          <a href="#book-audit" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem;">Offload Your Tech <i class="fa-solid fa-arrow-right"></i></a>
        </div>`;
html = html.replace(oldHero, newHero);

// Replace the sub-heading
html = html.replace('<h2 style="font-size: 2.2rem; color: var(--text-primary);">Stop working <span class="gradient-text">in</span> your business. Start working <span class="gradient-text">on</span> it.</h2>', '<h2 style="font-size: 2.2rem; color: var(--text-primary);">The Ultimate <span class="gradient-text">Hands-Off</span> Tech Stack</h2>');
html = html.replace(`<p style="color: var(--text-secondary); max-width: 600px; margin: 1rem auto 0; font-size: 1.1rem;">You don't need buzzwords. You need systems that actually save you time and make you money. Here is how we fix your biggest headaches.</p>`, `<p style="color: var(--text-secondary); max-width: 600px; margin: 1rem auto 0; font-size: 1.1rem;">Whether you need a new website, automated customer follow-ups, or someone to clean up your messy subscriptions, we take over your entire tech stack.</p>`);

// Update button at bottom
html = html.replace('Request Tech Audit', 'Request A Tech Consultation');

fs.writeFileSync(path.join(dir, 'smb-services.html'), html);

// Now update index.html cards
let indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

const newCards = `<div class="services-grid">
      <!-- Card 1 -->
      <div class="service-card glass-panel" style="background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.05);">
        <div class="card-icon" style="background: rgba(0, 98, 204, 0.05); color: var(--accent-cyan); border: none;">
          <i class="fa-solid fa-laptop-code"></i>
        </div>
        <h3 style="color: var(--text-primary);">Websites & E-Commerce</h3>
        <p style="color: var(--text-secondary);">We build, launch, and manage your website and online store. You don't have to worry about hosting, updates, or making changes—we handle it all.</p>
        <a href="smb-services.html" class="card-link" style="color: var(--accent-cyan);">Deep Dive <span><i class="fa-solid fa-chevron-right"></i></span></a>
      </div>
      
      <!-- Card 2 -->
      <div class="service-card glass-panel" style="background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.05);">
        <div class="card-icon" style="background: rgba(0, 98, 204, 0.05); color: var(--accent-cyan); border: none;">
          <i class="fa-solid fa-layer-group"></i>
        </div>
        <h3 style="color: var(--text-primary);">Tech Stack Management</h3>
        <p style="color: var(--text-secondary);">Stop paying for 10 different software subscriptions that don't talk to each other. We clean up your tools, integrate them, and save you money.</p>
        <a href="smb-services.html" class="card-link" style="color: var(--accent-cyan);">Deep Dive <span><i class="fa-solid fa-chevron-right"></i></span></a>
      </div>
      
      <!-- Card 3 -->
      <div class="service-card glass-panel" style="background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.05);">
        <div class="card-icon" style="background: rgba(0, 98, 204, 0.05); color: var(--accent-cyan); border: none;">
          <i class="fa-solid fa-comment-sms"></i>
        </div>
        <h3 style="color: var(--text-primary);">Business Automation & AI</h3>
        <p style="color: var(--text-secondary);">We set up automated customer follow-ups and AI website assistants so you never lose a lead while you are out on a job or asleep.</p>
        <a href="smb-services.html" class="card-link" style="color: var(--accent-cyan);">Deep Dive <span><i class="fa-solid fa-chevron-right"></i></span></a>
      </div>
    </div>`;

const regex = /<div class="services-grid">[\s\S]*?<\/div>\s*<\/section>/;
indexHtml = indexHtml.replace(regex, newCards + '\\n  </section>');
fs.writeFileSync(path.join(dir, 'index.html'), indexHtml);

console.log('Successfully created smb-services.html and updated index.html cards.');
