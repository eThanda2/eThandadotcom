const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    try {
        console.log("Launching browser for Flyer...");
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        
        console.log("Reading logo...");
        const logoPath = path.join(__dirname, 'logo.png');
        const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });
        const logoDataUri = `data:image/png;base64,${logoBase64}`;
        
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap');
                body {
                    font-family: 'Outfit', sans-serif;
                    margin: 0;
                    padding: 0;
                    background: #fff;
                    color: #0b1120;
                    width: 794px; /* A4 Width */
                    height: 1123px; /* A4 Height */
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                }
                .hero {
                    background: linear-gradient(135deg, #0b1120 0%, #1e1b4b 100%);
                    color: white;
                    padding: 60px 50px;
                    text-align: center;
                    position: relative;
                }
                .hero::after {
                    content: '';
                    position: absolute;
                    bottom: -20px;
                    left: 0;
                    width: 100%;
                    height: 20px;
                    background: #00f2fe;
                }
                .logo {
                    width: 120px;
                    margin-bottom: 20px;
                    background: white;
                    padding: 10px;
                    border-radius: 12px;
                }
                h1 {
                    font-size: 48px;
                    margin: 0;
                    line-height: 1.1;
                    font-weight: 800;
                }
                .highlight {
                    color: #00f2fe;
                }
                .sub-hero {
                    font-size: 22px;
                    margin-top: 15px;
                    font-weight: 300;
                    opacity: 0.9;
                }
                .content {
                    padding: 60px 50px;
                    flex-grow: 1;
                }
                .pitch {
                    font-size: 26px;
                    font-weight: 700;
                    text-align: center;
                    margin-bottom: 40px;
                    color: #1e1b4b;
                }
                .grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                }
                .card {
                    background: #f8fafc;
                    padding: 25px;
                    border-radius: 15px;
                    border-left: 5px solid #00f2fe;
                }
                .card h3 {
                    margin: 0 0 10px 0;
                    font-size: 20px;
                    color: #1e1b4b;
                }
                .card p {
                    margin: 0;
                    font-size: 15px;
                    color: #475569;
                    line-height: 1.5;
                }
                .footer {
                    background: #f1f5f9;
                    padding: 40px 50px;
                    text-align: center;
                    border-top: 2px solid #e2e8f0;
                }
                .footer h2 {
                    margin: 0 0 15px 0;
                    font-size: 32px;
                    color: #1e1b4b;
                }
                .contact-box {
                    background: #1e1b4b;
                    color: white;
                    display: inline-block;
                    padding: 15px 40px;
                    border-radius: 50px;
                    font-size: 24px;
                    font-weight: 700;
                    margin-bottom: 15px;
                }
                .contact-box span {
                    color: #00f2fe;
                }
                .website {
                    font-size: 18px;
                    color: #475569;
                    font-weight: 600;
                }
            </style>
        </head>
        <body>
            <div class="hero">
                <img src="${logoDataUri}" class="logo" />
                <h1>Save Time. Get More Leads.<br><span class="highlight">Increase Revenue.</span></h1>
                <div class="sub-hero">We take over your entire tech stack so you can focus on running your business.</div>
            </div>

            <div class="content">
                <div class="pitch">Stop losing money to bad tech and messy spreadsheets.</div>
                
                <div class="grid">
                    <div class="card">
                        <h3>Custom Websites</h3>
                        <p>Beautiful, blazing-fast websites designed to rank on Google and convert local visitors into paying customers. <strong>Starts at just $99.</strong></p>
                    </div>
                    <div class="card">
                        <h3>Automated Follow-Ups</h3>
                        <p>Never lose a lead to a missed call again. We set up systems that instantly text customers back while you are out on a job.</p>
                    </div>
                    <div class="card">
                        <h3>E-Commerce & Shopify</h3>
                        <p>Want to sell online? We build and manage high-converting digital storefronts that handle inventory and payments effortlessly.</p>
                    </div>
                    <div class="card">
                        <h3>Tech & Software Cleanup</h3>
                        <p>Stop paying for 10 different apps. We audit your business, consolidate your software, and automate the boring tasks.</p>
                    </div>
                </div>
            </div>

            <div class="footer">
                <h2>Ready to grow your business?</h2>
                <div class="contact-box">Call or Text: <span>(346) 382-5020</span></div>
                <div class="website">www.ethanda.com &nbsp;|&nbsp; contactus@ethanda.com</div>
            </div>
        </body>
        </html>
        `;
        
        console.log("Setting content...");
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        
        console.log("Generating Flyer PDF...");
        await page.pdf({ 
            path: 'eThanda_Small_Business_Flyer.pdf', 
            format: 'A4',
            printBackground: true,
            margin: { top: '0', right: '0', bottom: '0', left: '0' }
        });

        await browser.close();
        console.log("Flyer PDF generated successfully!");
    } catch(err) {
        console.error("Error generating Flyer:", err);
        process.exit(1);
    }
})();
