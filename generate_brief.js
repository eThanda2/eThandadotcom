const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    try {
        console.log("Launching browser for brief...");
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        
        const logoPath = path.join(__dirname, 'logo.png');
        const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });
        const logoDataUri = `data:image/png;base64,${logoBase64}`;
        
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Company Brief</title>
            <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Inter', sans-serif;
                    color: #0A192F;
                    line-height: 1.6;
                    margin: 0;
                    padding: 40px 50px;
                    background-color: #fff;
                }
                .header {
                    display: flex;
                    align-items: center;
                    border-bottom: 2px solid #00E5FF;
                    padding-bottom: 15px;
                    margin-bottom: 30px;
                }
                .logo {
                    width: 55px;
                    height: 55px;
                    margin-right: 15px;
                    object-fit: contain;
                }
                .company-name {
                    font-family: 'Cinzel', serif;
                    font-size: 24px;
                    font-weight: 700;
                    color: #0A192F;
                    letter-spacing: 0.5px;
                }
                h1 {
                    font-size: 20px;
                    color: #0A192F;
                    margin-bottom: 20px;
                    font-weight: 600;
                }
                .content {
                    font-size: 14px;
                    color: #334155;
                }
                .content p {
                    margin-bottom: 15px;
                }
                .footer {
                    margin-top: 50px;
                    font-size: 11px;
                    color: #64748B;
                    text-align: center;
                    border-top: 1px solid #E2E8F0;
                    padding-top: 15px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <img src="${logoDataUri}" class="logo" />
                <span class="company-name">eThanda Technologies</span>
            </div>

            <h1>About eThanda Technologies</h1>

            <div class="content">
                <p>eThanda LLC (d/b/a eThanda Technologies) is an agile, fast-growing IT consulting and software engineering startup specializing in bridging the gap between legacy infrastructure and modern cloud architecture.</p>
                <p>Operating out of the United States and India (with proposed expansions into the UK and Australia), we partner with prospective clients to secure, scale, and seamlessly modernize their mission-critical business systems for the digital age.</p>
            </div>

            <div class="footer">
                eThanda Technologies | 74 West Sandalbranch Circle, Spring, Texas - 77382 | contactus@ethanda.com | www.ethanda.com
            </div>
        </body>
        </html>
        `;
        
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        
        await page.pdf({ 
            path: 'eThanda_Company_Brief.pdf', 
            format: 'A4',
            printBackground: true,
            margin: { top: '30px', right: '30px', bottom: '30px', left: '30px' }
        });

        await browser.close();
        console.log("Company Brief PDF generated successfully!");
    } catch(err) {
        console.error("Error generating PDF:", err);
        process.exit(1);
    }
})();
