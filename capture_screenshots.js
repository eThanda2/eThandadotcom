const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        
        const filePath = `file://${path.join(__dirname, 'index.html').replace(/\\/g, '/')}`;
        await page.goto(filePath, { waitUntil: 'networkidle0' });
        
        // 1. Screenshot Footer
        const footer = await page.$('footer');
        if (footer) {
            await footer.screenshot({ path: 'screenshot_footer.png' });
            console.log('Footer screenshot saved.');
        }
        
        // 2. Screenshot Dropdown
        // We need to hover over the "Small Business" dropdown
        const dropdowns = await page.$$('.dropdown');
        for (let dropdown of dropdowns) {
            const text = await page.evaluate(el => el.textContent, dropdown);
            if (text.includes('Small Business')) {
                await dropdown.hover();
                // Wait for animation or display
                await new Promise(r => setTimeout(r, 500));
                
                // Screenshot just the header area
                const header = await page.$('header');
                if (header) {
                    await header.screenshot({ path: 'screenshot_nav.png' });
                    console.log('Nav screenshot saved.');
                }
                break;
            }
        }
        
        await browser.close();
    } catch (err) {
        console.error(err);
    }
})();
