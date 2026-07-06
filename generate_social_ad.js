const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    try {
        console.log("Launching browser for Social Ad...");
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        
        console.log("Reading logo...");
        const logoPath = path.join(__dirname, 'logo.png');
        const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });
        const logoDataUri = `data:image/png;base64,${logoBase64}`;
        
        // ------------------ SOCIAL MEDIA AD (1080x1080) ------------------
        await page.setViewport({ width: 1080, height: 1080 }); 
        
        const adHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700;900&display=swap');
                body {
                    font-family: 'Outfit', sans-serif;
                    margin: 0;
                    padding: 0;
                    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
                    color: white;
                    width: 1080px;
                    height: 1080px;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    position: relative;
                    border: 15px solid #00f2fe;
                }
                .logo {
                    width: 250px;
                    margin-bottom: 50px;
                    background: white;
                    padding: 20px;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0, 242, 254, 0.2);
                }
                h1 {
                    font-size: 85px;
                    font-weight: 900;
                    margin: 0 0 20px 0;
                    line-height: 1.1;
                    color: white;
                    text-transform: uppercase;
                }
                .highlight-yellow {
                    color: #fbbf24; /* Bright yellow for extreme attention */
                }
                .pain-point {
                    font-size: 45px;
                    font-weight: 500;
                    color: #cbd5e1;
                    margin: 0 80px 40px 80px;
                    line-height: 1.4;
                }
                .solution {
                    background: rgba(0, 242, 254, 0.1);
                    border: 3px dashed #00f2fe;
                    padding: 30px 60px;
                    border-radius: 20px;
                    font-size: 55px;
                    font-weight: 700;
                    color: #00f2fe;
                    margin-bottom: 60px;
                }
                .cta-container {
                    background: white;
                    color: #1e1b4b;
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                    padding: 40px 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-top: 5px solid #00f2fe;
                }
                .call-text {
                    font-size: 45px;
                    font-weight: 900;
                    margin-bottom: 10px;
                }
                .phone-number {
                    font-size: 75px;
                    font-weight: 900;
                    color: #e11d48; /* Red to pop out */
                    margin-bottom: 10px;
                }
                .website {
                    font-size: 35px;
                    font-weight: 700;
                    color: #475569;
                }
            </style>
        </head>
        <body>
            <img src="${logoDataUri}" class="logo" />
            
            <h1>ARE YOU A <span class="highlight-yellow">SMALL BUSINESS</span> OWNER?</h1>
            
            <div class="pain-point">
                Looking for low-cost technology solutions, but worried about high corporate costs?
            </div>
            
            <div class="solution">
                Don't worry. Problem Solved.<br>Time Saved.
            </div>
            
            <div class="cta-container">
                <div class="call-text">JUST CALL OR TEXT US:</div>
                <div class="phone-number">(346) 382-5020</div>
                <div class="website">www.ethanda.com</div>
            </div>
        </body>
        </html>
        `;
        
        await page.setContent(adHtml, { waitUntil: 'domcontentloaded' });
        
        // Wait an extra second to ensure fonts render perfectly
        await new Promise(r => setTimeout(r, 1000));
        
        await page.screenshot({ path: 'eThanda_Social_Media_Ad.jpg', quality: 100, fullPage: true });

        await browser.close();
        console.log("Social Ad image generated successfully!");
    } catch(err) {
        console.error("Error generating ad image:", err);
        process.exit(1);
    }
})();
