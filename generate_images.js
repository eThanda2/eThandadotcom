const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    try {
        console.log("Launching browser for Image Generation...");
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        
        console.log("Reading logo...");
        const logoPath = path.join(__dirname, 'logo.png');
        const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });
        const logoDataUri = `data:image/png;base64,${logoBase64}`;
        
        // ------------------ FLYER IMAGE ------------------
        console.log("Rendering Flyer Image...");
        // Set viewport to A4 aspect ratio at higher resolution for crisp images
        await page.setViewport({ width: 1200, height: 1697 }); 
        
        const flyerHtml = `
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
                    width: 1200px;
                    height: 1697px;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                }
                .flyer-hero {
                    background: linear-gradient(135deg, #0b1120 0%, #1e1b4b 100%);
                    color: white;
                    padding: 40px 75px;
                    text-align: center;
                    position: relative;
                }
                .hero::after {
                    content: '';
                    position: absolute;
                    bottom: -30px;
                    left: 0;
                    width: 100%;
                    height: 30px;
                    background: #00f2fe;
                }
                .logo {
                    width: 180px;
                    margin-bottom: 30px;
                    background: white;
                    padding: 15px;
                    border-radius: 18px;
                }
                h1 {
                    font-size: 72px;
                    margin: 0;
                    line-height: 1.1;
                    font-weight: 800;
                }
                .highlight {
                    color: #00f2fe;
                }
                .sub-hero {
                    font-size: 33px;
                    margin-top: 22px;
                    font-weight: 300;
                    opacity: 0.9;
                }
                .flyer-content {
                    padding: 40px 75px;
                    flex-grow: 1;
                }
                .pitch {
                    font-size: 39px;
                    font-weight: 700;
                    text-align: center;
                    margin-bottom: 60px;
                    color: #1e1b4b;
                }
                .grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 45px;
                }
                .card {
                    background: #f8fafc;
                    padding: 38px;
                    border-radius: 22px;
                    border-left: 8px solid #00f2fe;
                }
                .card h3 {
                    margin: 0 0 15px 0;
                    font-size: 30px;
                    color: #1e1b4b;
                }
                .card p {
                    margin: 0;
                    font-size: 22px;
                    color: #475569;
                    line-height: 1.5;
                }
                .flyer-footer {
                    background: #f1f5f9;
                    padding: 20px 75px;
                    text-align: center;
                    border-top: 2px solid #e2e8f0;
                }
                .flyer-footer h2 {
                    margin: 0 0 20px 0;
                    font-size: 48px;
                    color: #1e1b4b;
                }
                .global-bar {
                    background: #1e1b4b;
                    color: #00f2fe;
                    padding: 20px 75px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 24px;
                    font-weight: 700;
                }
            </style>
        </head>
        <body>
            <div class="flyer-hero">
                <div style="font-size: 72px; font-weight: 900; margin-bottom: 20px; line-height: 1;"><span style="color: #00f2fe;">eT</span> <span style="color: white;">Tech</span></div>
                <h1>Save Time. Get More Leads.<br><span class="highlight">Increase Revenue.</span></h1>
                <div class="sub-hero">We take over your entire tech stack so you can focus on running your business.</div>
            </div>

            <div class="flyer-content">
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

            <div class="flyer-footer">
                <h2>Ready to grow your business?</h2>
                <div style="font-size: 32px; color: #475569; font-weight: 600; margin-top: 20px;">We take over your entire tech stack so you can focus on running your business.</div>
            </div>
            
            <!-- Global Bar -->
            <div class="global-bar">
                <span>www.ethanda.com</span>
                <span>eT Tech</span>
                <span>(346) 382-5020</span>
            </div>
        </body>
        </html>
        `;
        
        await page.setContent(flyerHtml, { waitUntil: 'domcontentloaded' });
        await page.screenshot({ path: 'eThanda_Small_Business_Flyer.jpg', quality: 100, fullPage: true });

        // ------------------ BROCHURE IMAGES (Page 1 & 2) ------------------
        console.log("Rendering Brochure Images...");
        const brochureHtmlP1 = `
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
                    width: 1200px;
                    height: 1697px;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                }
                .cover-hero {
                    background: linear-gradient(135deg, #0b1120 0%, #1e1b4b 100%);
                    color: white;
                    padding: 120px 75px;
                    text-align: center;
                    border-bottom: 22px solid #00f2fe;
                }
                .logo {
                    width: 210px;
                    margin-bottom: 45px;
                    background: white;
                    padding: 18px;
                    border-radius: 18px;
                }
                h1 {
                    font-size: 84px;
                    margin: 0;
                    line-height: 1.1;
                    font-weight: 800;
                }
                .highlight {
                    color: #00f2fe;
                }
                .cover-content {
                    padding: 90px 75px;
                    flex-grow: 1;
                }
                .big-text {
                    font-size: 48px;
                    font-weight: 700;
                    color: #1e1b4b;
                    margin-bottom: 30px;
                }
                .description {
                    font-size: 27px;
                    color: #475569;
                    line-height: 1.6;
                    margin-bottom: 60px;
                }
                .stats-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                }
                .stat-box {
                    background: #f8fafc;
                    padding: 45px;
                    border-radius: 18px;
                    text-align: center;
                    border: 2px solid #e2e8f0;
                }
                .stat-number {
                    font-size: 60px;
                    font-weight: 800;
                    color: #00f2fe;
                    margin-bottom: 15px;
                }
                .stat-label {
                    font-size: 24px;
                    font-weight: 600;
                    color: #1e1b4b;
                }
                .global-bar {
                    background: #1e1b4b;
                    color: #00f2fe;
                    padding: 20px 75px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 24px;
                    font-weight: 700;
                }
            </style>
        </head>
        <body>
            <div class="cover-hero">
                <div style="font-size: 72px; font-weight: 900; margin-bottom: 20px; line-height: 1;"><span style="color: #00f2fe;">eT</span> <span style="color: white;">Tech</span></div>
                <h1>Small Business.<br>Big <span class="highlight">Technology.</span></h1>
            </div>
            <div class="cover-content">
                <div class="big-text">We handle the tech.<br>You handle the business.</div>
                <div class="description">
                    Most local businesses are losing thousands of dollars a month because their website is outdated, they miss phone calls while on the job, or they are paying for 10 different expensive software subscriptions. eT Tech partners with local businesses to solve this.
                </div>
                <div class="stats-grid">
                    <div class="stat-box">
                        <div class="stat-number">24/7</div>
                        <div class="stat-label">Automated Lead Capture</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-number">$99</div>
                        <div class="stat-label">Starting Web Design</div>
                    </div>
                </div>
            </div>
            
            <!-- Global Bar -->
            <div class="global-bar">
                <span>www.ethanda.com</span>
                <span>eT Tech</span>
                <span>(346) 382-5020</span>
            </div>
        </body>
        </html>
        `;

        await page.setContent(brochureHtmlP1, { waitUntil: 'domcontentloaded' });
        await page.screenshot({ path: 'eThanda_SMB_Brochure_Page_1.jpg', quality: 100, fullPage: true });

        const brochureHtmlP2 = `
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
                    width: 1200px;
                    height: 1697px;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                }
                .page-header {
                    background: #1e1b4b;
                    color: white;
                    padding: 60px 75px;
                }
                .page-header h2 {
                    margin: 0;
                    font-size: 54px;
                    color: #00f2fe;
                }
                .page-content {
                    padding: 60px 75px;
                    flex-grow: 1;
                }
                .compare-box {
                    display: flex;
                    margin-bottom: 45px;
                    background: #f8fafc;
                    border-radius: 18px;
                    overflow: hidden;
                    border: 2px solid #e2e8f0;
                }
                .before, .after {
                    padding: 38px;
                    flex: 1;
                }
                .before {
                    background: #fff0f2;
                    border-right: 2px solid #e2e8f0;
                }
                .after {
                    background: #f0fdf4;
                }
                .compare-title {
                    font-size: 27px;
                    font-weight: 700;
                    margin-bottom: 15px;
                }
                .before .compare-title { color: #e11d48; }
                .after .compare-title { color: #16a34a; }
                .compare-text {
                    font-size: 22px;
                    color: #475569;
                    line-height: 1.5;
                }
                .brochure-footer {
                    background: #0b1120;
                    color: white;
                    padding: 45px 75px;
                    text-align: center;
                }
                .footer-text {
                    font-size: 30px;
                    font-weight: 600;
                    margin-bottom: 15px;
                }
                .global-bar {
                    background: #1e1b4b;
                    color: #00f2fe;
                    padding: 20px 75px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 24px;
                    font-weight: 700;
                }
            </style>
        </head>
        <body>
            <div class="page-header">
                <h2>The eT Tech Difference</h2>
            </div>
            <div class="page-content">
                <div class="compare-box">
                    <div class="before">
                        <div class="compare-title">❌ Before eT Tech</div>
                        <div class="compare-text">You are up on a ladder or under a sink. A customer calls, but you can't answer. They call the next guy on Google and you lose a $500 job.</div>
                    </div>
                    <div class="after">
                        <div class="compare-title">✅ After eT Tech</div>
                        <div class="compare-text">You miss a call. Our system instantly texts the customer: "Sorry we missed you! How can we help?" They text back, and you secure the lead.</div>
                    </div>
                </div>
                <div class="compare-box">
                    <div class="before">
                        <div class="compare-title">❌ Before eT Tech</div>
                        <div class="compare-text">Your website was built in 2012. It looks bad on mobile, loads slowly, and Google hides it from local search results.</div>
                    </div>
                    <div class="after">
                        <div class="compare-title">✅ After eT Tech</div>
                        <div class="compare-text">You have a gorgeous, blazing-fast website with a "Text Us" button. It ranks on Google and turns local traffic into paying customers.</div>
                    </div>
                </div>
                <div class="compare-box">
                    <div class="before">
                        <div class="compare-title">❌ Before eT Tech</div>
                        <div class="compare-text">You pay monthly for Mailchimp, Calendly, QuickBooks, Square, and a CRM, but none of them talk to each other.</div>
                    </div>
                    <div class="after">
                        <div class="compare-title">✅ After eT Tech</div>
                        <div class="compare-text">We consolidate your software, saving you hundreds a month, and automate your workflow so everything runs smoothly.</div>
                    </div>
                </div>
            </div>
            <div class="brochure-footer">
                <div class="footer-text">Ready to completely upgrade your business?</div>
                <div style="margin-top: 15px; font-size: 24px; color: #94a3b8;">Our experts are ready to provide a free audit of your current tech setup.</div>
            </div>
            
            <!-- Global Bar -->
            <div class="global-bar">
                <span>www.ethanda.com</span>
                <span>eT Tech</span>
                <span>(346) 382-5020</span>
            </div>
        </body>
        </html>
        `;

        await page.setContent(brochureHtmlP2, { waitUntil: 'domcontentloaded' });
        await page.screenshot({ path: 'eThanda_SMB_Brochure_Page_2.jpg', quality: 100, fullPage: true });

        await browser.close();
        console.log("Image generation completed successfully!");
    } catch(err) {
        console.error("Error generating images:", err);
        process.exit(1);
    }
})();
