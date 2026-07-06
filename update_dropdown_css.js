const fs = require('fs');

const cssPath = 'c:\\Users\\selva\\OneDrive\\Documents\\eThandadotcom\\style.css';
let content = fs.readFileSync(cssPath, 'utf8');

const oldCss = `.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(15px);
  background: var(--bg-secondary);
  border: 1px solid var(--card-border);
  box-shadow: var(--shadow-glow);
  border-radius: 12px;
  padding: 0.8rem 0;
  min-width: 220px;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition-smooth);
  z-index: 100;
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.dropdown-menu li {
  width: 100%;
}

.dropdown-menu a {
  display: block;
  padding: 0.6rem 1.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  transition: var(--transition-fast);
}

.dropdown-menu a:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--accent-cyan);
  padding-left: 1.8rem;
}`;

const newCss = `.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(15px);
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  border-radius: 12px;
  padding: 0.5rem;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 100;
  list-style: none !important;
  margin: 0;
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(10px);
}

.dropdown-menu li {
  width: 100%;
  list-style: none !important;
  margin: 0;
}

.dropdown-menu a {
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-secondary);
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.dropdown-menu a::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: var(--accent-cyan);
  border-radius: 4px;
  transform: scaleY(0);
  transition: transform 0.2s ease;
}

.dropdown-menu a:hover {
  background: rgba(0, 242, 254, 0.05);
  color: var(--accent-cyan);
  padding-left: 1.4rem;
}

.dropdown-menu a:hover::before {
  transform: scaleY(0.6);
}`;

content = content.replace(oldCss, newCss);

fs.writeFileSync(cssPath, content);
console.log('Successfully updated dropdown styling');
