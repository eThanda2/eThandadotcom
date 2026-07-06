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
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&display=swap');
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
                    width: 200px;
                    margin-top: 40px;
                    margin-bottom: 30px;
                    background: white;
                    padding: 15px;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0, 242, 254, 0.2);
                }
                h1 {
                    font-size: 70px;
                    font-weight: 900;
                    margin: 0 0 15px 0;
                    line-height: 1.15;
                    color: white;
                }
                .highlight-yellow {
                    color: #fbbf24;
                }
                .pain-point {
                    font-size: 40px;
                    font-weight: 400;
                    color: #e2e8f0;
                    margin: 0 80px 25px 80px;
                    line-height: 1.4;
                }
                .solution {
                    background: rgba(0, 242, 254, 0.1);
                    border: 3px dashed #00f2fe;
                    padding: 25px 50px;
                    border-radius: 20px;
                    font-size: 48px;
                    font-weight: 700;
                    color: #00f2fe;
                    margin-bottom: 25px;
                }
                .pricing {
                    font-size: 45px;
                    font-weight: 700;
                    color: #fbbf24;
                    margin-bottom: 35px;
                    background: rgba(251, 191, 36, 0.15);
                    padding: 15px 40px;
                    border-radius: 50px;
                }
                .cta-container {
                    background: white;
                    color: #1e1b4b;
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                    padding: 30px 60px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center; /* Vertically center items */
                    border-top: 5px solid #00f2fe;
                    box-sizing: border-box;
                }
                .cta-text-area {
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .call-text {
                    font-size: 30px;
                    font-weight: 700;
                    color: #475569;
                    margin-bottom: 5px;
                }
                .phone-number {
                    font-size: 65px;
                    font-weight: 900;
                    color: #e11d48;
                    margin-bottom: 5px;
                }
                .website {
                    font-size: 30px;
                    font-weight: 600;
                    color: #0ea5e9;
                }
                .qr-code {
                    width: 150px;
                    height: 150px;
                    border: 4px solid #1e1b4b;
                    border-radius: 10px;
                    padding: 5px;
                    background: white;
                }
                .qr-label {
                    font-size: 16px;
                    font-weight: 700;
                    color: #1e1b4b;
                    margin-top: 8px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <img src="${logoDataUri}" class="logo" />
            
            <h1>Are you a <span class="highlight-yellow">Small Business</span> owner?</h1>
            
            <div class="pain-point">
                Looking for tech solutions but worried about the high cost?
            </div>
            
            <div class="solution">
                Problem Solved. Time Saved.
            </div>

            <div class="pricing">
                Complete Websites Start at $99
            </div>
            
            <div class="cta-container">
                <div class="cta-text-area">
                    <div class="call-text">Call or Text Us Today:</div>
                    <div class="phone-number">(346) 382-5020</div>
                    <div class="website">www.ethanda.com</div>
                </div>
                <div>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.ethanda.com" class="qr-code" />
                    <div class="qr-label">SCAN TO VISIT</div>
                </div>
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
