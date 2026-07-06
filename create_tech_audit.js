const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\selva\\OneDrive\\Documents\\eThandadotcom';
const consultingPath = path.join(dir, 'consulting.html');
const auditPath = path.join(dir, 'tech-audit.html');

let content = fs.readFileSync(consultingPath, 'utf8');

// The new page content that will replace the PAGE HERO and SERVICES HUB CONTENT
const newContent = `
  <!-- PAGE HERO -->
  <section class="page-hero" style="background: #fff; padding-top: 140px; padding-bottom: 4rem; border-bottom: 1px solid rgba(0,0,0,0.05);">
    <span class="section-tag" style="background: rgba(168,85,247,0.15); padding: 5px 12px; border-radius: 20px; color: var(--accent-purple); font-weight: 700; text-transform: uppercase;">Small Business Strategy</span>
    <h1 style="color: var(--text-primary); font-size: 3rem; margin-top: 1rem;">AI & Tech <span class="gradient-text">Audits</span></h1>
    <p class="subtitle" style="color: var(--text-secondary); max-width: 700px; margin: 1rem auto 0; font-size: 1.15rem;">We analyze your business, eliminate messy spreadsheets, consolidate your tools, and implement AI to stop you from missing leads. Get your weekends back.</p>
  </section>

  <!-- CONTENT -->
  <section style="padding: 5rem 2rem; max-width: 1200px; margin: 0 auto;">
    
    <div style="text-align: center; margin-bottom: 4rem;">
      <h2 style="font-size: 2.2rem; color: var(--text-primary);">Stop working <span class="gradient-text">in</span> your business. Start working <span class="gradient-text">on</span> it.</h2>
      <p style="color: var(--text-secondary); max-width: 600px; margin: 1rem auto 0; font-size: 1.1rem;">You don't need buzzwords. You need systems that actually save you time and make you money. Here is how we fix your biggest headaches.</p>
    </div>

    <div class="services-detail-grid">
      
      <div class="detail-card glass-panel" style="background: #fff; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 8px 30px rgba(0,0,0,0.03);">
        <div class="card-icon" style="background: rgba(168, 85, 247, 0.05); color: var(--accent-purple); border: none;">
          <i class="fa-solid fa-phone-slash"></i>
        </div>
        <h3 style="color: var(--text-primary);">The "Ghosting" Problem</h3>
        <p style="color: var(--text-secondary);">You're on a job, a customer calls, and you miss it. They go to a competitor.</p>
        <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
          <strong style="color: var(--accent-cyan);"><i class="fa-solid fa-check"></i> The eThanda Solution:</strong><br>
          <span style="font-size: 0.95rem; color: var(--text-secondary);">We install an AI responder that instantly texts back missed calls: "Hi! I'm on a job right now, but how can I help you?" Never lose a lead again.</span>
        </div>
      </div>

      <div class="detail-card glass-panel" style="background: #fff; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 8px 30px rgba(0,0,0,0.03);">
        <div class="card-icon" style="background: rgba(168, 85, 247, 0.05); color: var(--accent-purple); border: none;">
          <i class="fa-solid fa-file-excel"></i>
        </div>
        <h3 style="color: var(--text-primary);">Drowning in Spreadsheets</h3>
        <p style="color: var(--text-secondary);">You spend your nights copying data from emails into Google Sheets or writing invoices.</p>
        <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
          <strong style="color: var(--accent-cyan);"><i class="fa-solid fa-check"></i> The eThanda Solution:</strong><br>
          <span style="font-size: 0.95rem; color: var(--text-secondary);">Workflow automation. When a quote is signed, we automatically generate an invoice in QuickBooks and a project board in Trello.</span>
        </div>
      </div>

      <div class="detail-card glass-panel" style="background: #fff; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 8px 30px rgba(0,0,0,0.03);">
        <div class="card-icon" style="background: rgba(168, 85, 247, 0.05); color: var(--accent-purple); border: none;">
          <i class="fa-solid fa-layer-group"></i>
        </div>
        <h3 style="color: var(--text-primary);">Too Many Subscriptions</h3>
        <p style="color: var(--text-secondary);">You use Mailchimp, Shopify, Square, a booking app, and Excel. It's expensive chaos.</p>
        <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
          <strong style="color: var(--accent-cyan);"><i class="fa-solid fa-check"></i> The eThanda Solution:</strong><br>
          <span style="font-size: 0.95rem; color: var(--text-secondary);">The Tech Audit. We review your stack, consolidate your tools to save you hundreds of dollars a month, and make them talk to each other.</span>
        </div>
      </div>

      <div class="detail-card glass-panel" style="background: #fff; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 8px 30px rgba(0,0,0,0.03);">
        <div class="card-icon" style="background: rgba(168, 85, 247, 0.05); color: var(--accent-purple); border: none;">
          <i class="fa-solid fa-bullhorn"></i>
        </div>
        <h3 style="color: var(--text-primary);">Marketing & Local SEO</h3>
        <p style="color: var(--text-secondary);">You don't have time to write blog posts or beg for Google Reviews.</p>
        <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
          <strong style="color: var(--accent-cyan);"><i class="fa-solid fa-check"></i> The eThanda Solution:</strong><br>
          <span style="font-size: 0.95rem; color: var(--text-secondary);">We set up AI to write your local SEO content in minutes, and automate text messages that ask customers for 5-star reviews the moment a job is done.</span>
        </div>
      </div>
    </div>

    <!-- CALL TO ACTION FORM -->
    <div id="book-audit" style="margin-top: 5rem; background: var(--bg-secondary); padding: 4rem; border-radius: 12px; border: 1px solid rgba(0,0,0,0.05); text-align: center;">
      <h3 style="font-size: 2rem; color: var(--text-primary); margin-bottom: 1rem;">Ready to reclaim your time?</h3>
      <p style="color: var(--text-secondary); margin-bottom: 2rem;">Fill out the form below to request a free introductory Tech Audit for your business.</p>
      
      <form action="https://formspree.io/f/mkolykgy" method="POST" style="max-width: 500px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; text-align: left;">
        <div>
          <label style="display: block; font-size: 0.9rem; margin-bottom: 0.3rem; font-weight: 500; color: var(--text-primary);">Name or Business Name *</label>
          <input type="text" name="name" required style="width: 100%; padding: 0.8rem; border: 1px solid #cbd5e1; border-radius: 8px; background: #fff;" placeholder="Jane Doe / Retail Co.">
        </div>
        <div>
          <label style="display: block; font-size: 0.9rem; margin-bottom: 0.3rem; font-weight: 500; color: var(--text-primary);">Email *</label>
          <input type="email" name="email" required style="width: 100%; padding: 0.8rem; border: 1px solid #cbd5e1; border-radius: 8px; background: #fff;" placeholder="jane@example.com">
        </div>
        <div>
            <label style="display: block; font-size: 0.9rem; margin-bottom: 0.3rem; font-weight: 500; color: var(--text-primary);">Phone Number (Optional)</label>
            <div style="display: flex; gap: 0.5rem;">
              <span style="display: flex; align-items: center; justify-content: center; padding: 0.8rem; border: 1px solid #cbd5e1; border-radius: 8px; background: #f8fafc; color: var(--text-secondary); width: 90px; font-weight: 500;">🇺🇸 +1</span>
              <input type="hidden" name="countryCode" value="+1">
              <input type="tel" name="phone" style="width: 100%; padding: 0.8rem; border: 1px solid #cbd5e1; border-radius: 8px; background: #fff;" placeholder="(555) 000-0000">
            </div>
        </div>
        <div>
          <label style="display: block; font-size: 0.9rem; margin-bottom: 0.3rem; font-weight: 500; color: var(--text-primary);">What is your biggest headache right now?</label>
          <textarea name="message" rows="4" style="width: 100%; padding: 0.8rem; border: 1px solid #cbd5e1; border-radius: 8px; background: #fff; resize: vertical;" placeholder="I'm spending 10 hours a week on invoices..."></textarea>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Request Tech Audit <i class="fa-solid fa-arrow-right" style="margin-left: 0.5rem;"></i></button>
      </form>
    </div>

  </section>
`;

const headerRegex = /(<header[\s\S]*?<\/header>)/i;
const footerRegex = /(<footer[\s\S]*?<\/html>)/i;

const headerMatch = content.match(headerRegex);
const footerMatch = content.match(footerRegex);

let newPageHTML = content.substring(0, headerMatch.index + headerMatch[0].length);
newPageHTML += newContent;
newPageHTML += content.substring(footerMatch.index);

// Update Title and Meta Description
newPageHTML = newPageHTML.replace('<title>IT Consulting Services | eThanda Technologies</title>', '<title>AI & Tech Audits for Small Business | eThanda Technologies</title>');
newPageHTML = newPageHTML.replace("<meta name=\"description\" content=\"Explore eThanda Technologies' core IT consulting services: IBM i Modernization, MIMIX High Availability, and Java Full Stack Engineering.\">", "<meta name=\"description\" content=\"eThanda Technologies provides Tech Audits and AI Implementation strategies for small businesses to automate workflows, consolidate software, and maximize ROI.\">");

fs.writeFileSync(auditPath, newPageHTML);

// NOW UPDATE index.html link
const indexPath = path.join(dir, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');
indexContent = indexContent.replace('<li><i class="fa-solid fa-microchip" style="color: var(--accent-cyan); margin-right: 12px; width: 24px;"></i> <strong>AI & Tech Audits</strong> - We analyze your tools and recommend AI for maximum ROI</li>', '<li><i class="fa-solid fa-microchip" style="color: var(--accent-cyan); margin-right: 12px; width: 24px;"></i> <strong><a href="tech-audit.html" style="color: var(--text-primary); text-decoration: none;">AI & Tech Audits <i class="fa-solid fa-arrow-right" style="font-size: 0.8em; margin-left: 5px; color: var(--accent-cyan);"></i></a></strong> - We analyze your tools and recommend AI for maximum ROI</li>');
fs.writeFileSync(indexPath, indexContent);

console.log('Successfully created tech-audit.html and linked it from index.html');
