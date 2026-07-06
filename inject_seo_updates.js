const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\selva\\OneDrive\\Documents\\eThandadotcom';
const appJsPath = path.join(dir, 'app.js');
const cssPath = path.join(dir, 'style.css');

// 1. UPDATE INDEX.CSS (Floating Widget Styles)
let css = fs.readFileSync(cssPath, 'utf8');
const widgetCss = `
/* ==========================================
   FLOATING ACTION BUTTON (LEAD GEN)
   ========================================== */
.floating-widget {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: bounceIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.floating-widget-text {
  background: #fff;
  color: var(--text-primary);
  padding: 0.8rem 1.2rem;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  font-weight: 500;
  font-size: 0.9rem;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.3s ease;
}
.floating-widget:hover .floating-widget-text {
  opacity: 1;
  transform: translateX(0);
}
.floating-widget-btn {
  background: var(--accent-cyan);
  color: #000;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  box-shadow: 0 4px 20px rgba(0, 242, 254, 0.4);
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
}
.floating-widget-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(0, 242, 254, 0.6);
  color: #000;
}
@keyframes bounceIn {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@media (max-width: 768px) {
  .floating-widget { bottom: 1.5rem; right: 1.5rem; }
  .floating-widget-text { display: none; } /* Hide text on mobile to save space */
}
`;
if (!css.includes('.floating-widget')) {
  fs.appendFileSync(cssPath, widgetCss);
}

// 2. UPDATE APP.JS (Inject Widget & Update Schema)
let appJs = fs.readFileSync(appJsPath, 'utf8');

// Inject Widget Logic
const widgetJs = `
/* ==========================================
   INJECT FLOATING WIDGET
   ========================================== */
function initFloatingWidget() {
  const widget = document.createElement('div');
  widget.className = 'floating-widget';
  widget.innerHTML = \`
    <div class="floating-widget-text">Questions? Text us!</div>
    <a href="sms:+13463825020" class="floating-widget-btn">
      <i class="fa-solid fa-comment-sms"></i>
    </a>
  \`;
  document.body.appendChild(widget);
}
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initFloatingWidget, 1500); // Load after 1.5s so it doesn't block main render
});
`;
if (!appJs.includes('initFloatingWidget')) {
  appJs += '\n' + widgetJs;
}

// Update Schema Descriptions
appJs = appJs.replace(
  '"description": "Enterprise IT Consulting specializing in AS400 modernization, Java Full Stack Development, and Small Business AI & Tech Audits."',
  '"description": "Small Business Tech Management. We build professional websites, setup e-commerce stores, and automate workflows so you can save time and increase revenue."'
);
appJs = appJs.replace(
  '"description": "Providing high-end IT infrastructure consulting and specialized small business website and automation solutions."',
  '"description": "We take over the entire tech stack for growing businesses. Custom websites, lead generation tools, CRM automation, and software cleanup."'
);

fs.writeFileSync(appJsPath, appJs);

console.log('Successfully updated CSS, injected Floating Widget, and updated SEO schema.');
