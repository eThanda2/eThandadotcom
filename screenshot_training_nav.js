const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        
        await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });
        
        await page.hover('a[href="training.html"]');
        
        // wait for animation
        await new Promise(r => setTimeout(r, 500));
        
        const navContainer = await page.$('header');
        await navContainer.screenshot({ path: path.join(__dirname, 'screenshot_training_nav.png') });
        console.log('Training Nav screenshot saved.');
        
        await browser.close();
    } catch (err) {
        console.error(err);
    }
})();
