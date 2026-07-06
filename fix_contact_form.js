const fs = require('fs');

const path = 'c:\\Users\\selva\\OneDrive\\Documents\\eThandadotcom\\contact.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Fix the form tag
content = content.replace('<form id="contactForm">', '<form action="https://formspree.io/f/mkolykgy" method="POST" id="contactForm">');

// 2. Fix the name input
content = content.replace('<input type="text" id="contactName" class="form-control" placeholder="Enter your full name" required>', '<input type="text" id="contactName" name="name" class="form-control" placeholder="Enter your full name" required>');

// 3. Fix the email input and insert the phone number AFTER the email's closing div
const oldEmailHTML = `<div class="form-group">
            <label for="contactEmail">Email Address</label>
            <input type="email" id="contactEmail" class="form-control" placeholder="Enter your business email" required>
          </div>`;

const newEmailAndPhoneHTML = `<div class="form-group">
            <label for="contactEmail">Email Address</label>
            <input type="email" id="contactEmail" name="email" class="form-control" placeholder="Enter your business email" required>
          </div>
          
          <div class="form-group">
            <label for="contactPhone">Phone Number (Optional)</label>
            <div style="display: flex; gap: 0.5rem;">
              <select id="countryCode" name="countryCode" class="form-control" style="width: 110px; flex-shrink: 0; background: rgba(0, 0, 0, 0.05); color: var(--text-primary);">
                <option value="+1" selected>🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+27">🇿🇦 +27</option>
              </select>
              <input type="tel" id="contactPhone" name="phone" class="form-control" placeholder="(555) 000-0000">
            </div>
          </div>`;

content = content.replace(oldEmailHTML, newEmailAndPhoneHTML);

// 4. Fix the subject select
content = content.replace('<select id="contactSubject" class="form-control"', '<select id="contactSubject" name="subject" class="form-control"');

// 5. Fix the message textarea
content = content.replace('<textarea id="contactMessage" class="form-control"', '<textarea id="contactMessage" name="message" class="form-control"');

fs.writeFileSync(path, content);
console.log('Fixed contact.html!');
