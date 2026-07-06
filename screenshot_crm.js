const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        
        await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
        
        await page.screenshot({ path: path.join(__dirname, 'screenshot_crm.png') });
        console.log('CRM Dashboard screenshot saved.');
        
        await browser.close();
    } catch (err) {
        console.error(err);
    }
})();
