const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    console.log("Generating Lead Magnet PDF...");
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    const logoPath = path.join(__dirname, 'logo.png');
    let logoDataUri = '';
    if (fs.existsSync(logoPath)) {
        const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });
        logoDataUri = `data:image/png;base64,${logoBase64}`;
    }

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800;900&display=swap');
            body {
                font-family: 'Outfit', sans-serif;
                margin: 0;
                padding: 0;
                color: #0b1120;
            }
            .page {
                width: 794px;
                height: 1123px;
                padding: 60px;
                box-sizing: border-box;
                page-break-after: always;
                background: white;
                position: relative;
            }
            .header {
                text-align: center;
                margin-bottom: 40px;
                border-bottom: 5px solid #00f2fe;
                padding-bottom: 20px;
            }
            h1 { font-size: 48px; font-weight: 900; margin: 0; color: #1e1b4b; line-height: 1.1; }
            h2 { font-size: 28px; color: #00f2fe; margin-top: 10px; }
            .point { margin-bottom: 30px; background: #f8fafc; padding: 25px; border-left: 5px solid #1e1b4b; border-radius: 0 10px 10px 0; }
            .point h3 { font-size: 24px; margin: 0 0 10px 0; color: #e11d48; }
            .point p { font-size: 16px; line-height: 1.6; margin: 0; }
            .footer { position: absolute; bottom: 40px; left: 60px; right: 60px; text-align: center; border-top: 1px solid #cbd5e1; padding-top: 20px; font-weight: 600; }
        </style>
    </head>
    <body>
        <div class="page">
            <div class="header">
                ${logoDataUri ? `<img src="${logoDataUri}" style="height: 60px; margin-bottom: 20px;">` : ''}
                <h1>The 5 Hidden Tech Costs Draining Your Small Business</h1>
                <h2>(And How To Stop The Bleeding)</h2>
            </div>
            
            <div class="point">
                <h3>1. The "Missed Call" Penalty</h3>
                <p>85% of people won't call back if you don't answer. If your average job is $500, missing just 2 calls a week costs you $52,000 a year. <strong>Solution:</strong> An automated missed-call text back system.</p>
            </div>
            
            <div class="point">
                <h3>2. Software Subscription Sprawl</h3>
                <p>Paying separately for Mailchimp, Calendly, QuickBooks, Square, and a CRM? You are likely overpaying by 300%. <strong>Solution:</strong> A consolidated, all-in-one tech stack.</p>
            </div>
            
            <div class="point">
                <h3>3. The "Page 5" Google Tax</h3>
                <p>If your website is slow or outdated, Google hides it. If you aren't on Page 1, you don't exist. <strong>Solution:</strong> A blazing-fast, modern website optimized for Local SEO.</p>
            </div>

            <div class="point">
                <h3>4. Manual Data Entry</h3>
                <p>Moving data from a spreadsheet to an invoice takes hours of unbillable time. <strong>Solution:</strong> Workflow automation that connects your apps so data moves instantly.</p>
            </div>

            <div class="footer">
                Stop the bleeding today. Call eT Tech at (346) 382-5020 for a Free Tech Audit.<br>
                <span style="color: #00f2fe;">www.ethanda.com</span>
            </div>
        </div>
    </body>
    </html>
    `;

    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.pdf({
        path: path.join(__dirname, 'eT_Tech_Lead_Magnet.pdf'),
        format: 'A4',
        printBackground: true
    });
    
    await browser.close();
    console.log("Lead Magnet PDF generated successfully!");
})();
