const fs = require('fs');

const path = 'c:\\Users\\selva\\OneDrive\\Documents\\eThandadotcom\\contact.html';
let content = fs.readFileSync(path, 'utf8');

const target = '</form>';
const replacement = `</form>
        <div style="text-align: center; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(0,0,0,0.05);">
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.8rem;">Or get a quote instantly via text:</p>
          <a href="sms:+13463825020" class="btn btn-secondary" style="width: 100%; border-color: #cbd5e1; border-radius: 8px;"><i class="fa-solid fa-message" style="margin-right: 0.5rem; color: var(--accent-cyan);"></i> Text (346) 382-5020</a>
        </div>`;

content = content.replace(target, replacement);
fs.writeFileSync(path, content);
console.log('Successfully updated contact.html');
