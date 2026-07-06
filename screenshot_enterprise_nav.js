const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        
        await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });
        
        // Hover over the Enterprise menu (it is the 3rd list item under nav-links, after Home and Small Business, wait no: Home, Small Business, Training, Enterprise)
        // Actually I can just hover the anchor tag that has href="consulting.html"
        await page.hover('a[href="consulting.html"]');
        
        // wait for animation
        await new Promise(r => setTimeout(r, 500));
        
        const navContainer = await page.$('header');
        await navContainer.screenshot({ path: path.join(__dirname, 'screenshot_enterprise_nav.png') });
        console.log('Enterprise Nav screenshot saved.');
        
        await browser.close();
    } catch (err) {
        console.error(err);
    }
})();
