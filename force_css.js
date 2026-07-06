const fs = require('fs');
const path = 'c:\\Users\\selva\\OneDrive\\Documents\\eThandadotcom\\style.css';

const newCss = `
/* ==========================================
   DROPDOWN OVERRIDES (NO BULLETS)
   ========================================== */
.nav-links .dropdown-menu,
.nav-links .dropdown-menu li {
  list-style: none !important;
  list-style-type: none !important;
  margin: 0 !important;
}

.nav-links .dropdown-menu {
  background: #ffffff !important;
  border: 1px solid rgba(0,0,0,0.05) !important;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
  padding: 0.5rem !important;
  min-width: 200px !important;
}

.nav-links .dropdown-menu a {
  display: flex !important;
  align-items: center !important;
  padding: 0.8rem 1rem !important;
  font-size: 0.95rem !important;
  font-weight: 500 !important;
  color: var(--text-secondary) !important;
  border-radius: 8px !important;
  transition: all 0.2s ease !important;
  position: relative !important;
  overflow: hidden !important;
}

.nav-links .dropdown-menu a::before {
  content: '' !important;
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
  height: 100% !important;
  width: 4px !important;
  background: var(--accent-cyan) !important;
  border-radius: 4px !important;
  transform: scaleY(0) !important;
  transition: transform 0.2s ease !important;
}

.nav-links .dropdown-menu a:hover {
  background: rgba(0, 242, 254, 0.05) !important;
  color: var(--accent-cyan) !important;
  padding-left: 1.4rem !important;
}

.nav-links .dropdown-menu a:hover::before {
  transform: scaleY(0.6) !important;
}
`;

fs.appendFileSync(path, newCss);
console.log('Successfully forced dropdown overrides.');
