const fs = require('fs');

// --- UPDATE INDEX.HTML ---
const index_path = 'c:\\Users\\selva\\OneDrive\\Documents\\eThandadotcom\\index.html';
let index_content = fs.readFileSync(index_path, 'utf8');

// 1. Change "Name *" to "Name or Business Name *"
index_content = index_content.replace(
  '<label style="display: block; font-size: 0.9rem; margin-bottom: 0.3rem; font-weight: 500;">Name *</label>',
  '<label style="display: block; font-size: 0.9rem; margin-bottom: 0.3rem; font-weight: 500;">Name or Business Name *</label>'
);
index_content = index_content.replace(
  'placeholder="Jane Doe"',
  'placeholder="Jane Doe / Retail Co."'
);

// 2. Change Phone Dropdown to static span
const oldDropdownIndex = `<select name="countryCode" style="padding: 0.8rem; border: 1px solid #cbd5e1; border-radius: 8px; background: #f8fafc; color: var(--text-primary); width: 110px;">
                <option value="+1" selected>🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+27">🇿🇦 +27</option>
              </select>`;
const newStaticIndex = `<span style="display: flex; align-items: center; justify-content: center; padding: 0.8rem; border: 1px solid #cbd5e1; border-radius: 8px; background: #f8fafc; color: var(--text-secondary); width: 90px; font-weight: 500;">🇺🇸 +1</span>
              <input type="hidden" name="countryCode" value="+1">`;

index_content = index_content.replace(oldDropdownIndex, newStaticIndex);

fs.writeFileSync(index_path, index_content);


// --- UPDATE CONTACT.HTML ---
const contact_path = 'c:\\Users\\selva\\OneDrive\\Documents\\eThandadotcom\\contact.html';
let contact_content = fs.readFileSync(contact_path, 'utf8');

// 1. Change "Full Name" to "Name or Business Name"
contact_content = contact_content.replace(
  '<label for="contactName">Full Name</label>',
  '<label for="contactName">Name or Business Name</label>'
);
contact_content = contact_content.replace(
  'placeholder="Enter your full name"',
  'placeholder="Enter your name or business name"'
);

// 2. Change Phone Dropdown to static span
const oldDropdownContact = `<select id="countryCode" name="countryCode" class="form-control" style="width: 110px; flex-shrink: 0; background: rgba(0, 0, 0, 0.05); color: var(--text-primary);">
                <option value="+1" selected>🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+27">🇿🇦 +27</option>
              </select>`;
const newStaticContact = `<span class="form-control" style="width: 90px; flex-shrink: 0; background: rgba(0, 0, 0, 0.05); color: var(--text-secondary); display: flex; align-items: center; justify-content: center; font-weight: 500;">🇺🇸 +1</span>
              <input type="hidden" name="countryCode" value="+1">`;

contact_content = contact_content.replace(oldDropdownContact, newStaticContact);

fs.writeFileSync(contact_path, contact_content);

console.log('Successfully updated the forms!');
