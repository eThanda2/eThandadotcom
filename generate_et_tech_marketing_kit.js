const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    try {
        console.log("Launching browser for Marketing Kit...");
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
                    position: relative;
                }
                .page {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    page-break-after: always;
                    position: relative;
                    background: white;
                    padding-bottom: 60px; /* Room for global bar */
                }
                .global-bar {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 60px;
                    background: #00f2fe;
                    color: #1e1b4b;
                    padding: 0 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 20px;
                    font-weight: 800;
                    box-sizing: border-box;
                    z-index: 100;
                }

                /* ---- PAGE 1: FLYER ---- */
                .flyer-hero {
                    background: linear-gradient(135deg, #0b1120 0%, #1e1b4b 100%);
                    color: white;
                    padding: 60px 50px;
                    text-align: center;
                    position: relative;
                }
                .flyer-hero::after {
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
                .flyer-hero h1 {
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
                .flyer-content {
                    padding: 40px 50px;
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
                .flyer-footer {
                    background: #f1f5f9;
                    padding: 20px 50px;
                    text-align: center;
                    border-top: 2px solid #e2e8f0;
                }
                .flyer-footer h2 {
                    margin: 0 0 15px 0;
                    font-size: 32px;
                    color: #1e1b4b;
                }

                /* ---- PAGE 2: BROCHURE FRONT ---- */
                .cover-hero {
                    background: linear-gradient(135deg, #0b1120 0%, #1e1b4b 100%);
                    color: white;
                    padding: 50px 50px;
                    text-align: center;
                    border-bottom: 15px solid #00f2fe;
                }
                .cover-logo {
                    width: 140px;
                    margin-bottom: 30px;
                    background: white;
                    padding: 12px;
                    border-radius: 12px;
                }
                .cover-hero h1 {
                    font-size: 56px;
                    margin: 0;
                    line-height: 1.1;
                    font-weight: 800;
                }
                .cover-content {
                    padding: 40px 50px;
                    flex-grow: 1;
                }
                .big-text {
                    font-size: 32px;
                    font-weight: 700;
                    color: #1e1b4b;
                    margin-bottom: 20px;
                }
                .description {
                    font-size: 18px;
                    color: #475569;
                    line-height: 1.6;
                    margin-bottom: 40px;
                }
                .stats-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }
                .stat-box {
                    background: #f8fafc;
                    padding: 30px;
                    border-radius: 12px;
                    text-align: center;
                    border: 1px solid #e2e8f0;
                }
                .stat-number {
                    font-size: 40px;
                    font-weight: 800;
                    color: #00f2fe;
                    margin-bottom: 10px;
                }
                .stat-label {
                    font-size: 16px;
                    font-weight: 600;
                    color: #1e1b4b;
                }
                
                /* ---- PAGE 3: BROCHURE BACK ---- */
                .page-header {
                    background: #1e1b4b;
                    color: white;
                    padding: 40px 50px;
                }
                .page-header h2 {
                    margin: 0;
                    font-size: 36px;
                    color: #00f2fe;
                }
                .page-content {
                    padding: 40px 50px;
                    flex-grow: 1;
                }
                .compare-box {
                    display: flex;
                    margin-bottom: 30px;
                    background: #f8fafc;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid #e2e8f0;
                }
                .before, .after {
                    padding: 25px;
                    flex: 1;
                }
                .before {
                    background: #fff0f2;
                    border-right: 1px solid #e2e8f0;
                }
                .after {
                    background: #f0fdf4;
                }
                .compare-title {
                    font-size: 18px;
                    font-weight: 700;
                    margin-bottom: 10px;
                }
                .before .compare-title { color: #e11d48; }
                .after .compare-title { color: #16a34a; }
                .compare-text {
                    font-size: 15px;
                    color: #475569;
                    line-height: 1.5;
                }
                
                .brochure-footer {
                    background: #0b1120;
                    color: white;
                    padding: 30px 50px;
                    text-align: center;
                }
                .footer-text {
                    font-size: 20px;
                    font-weight: 600;
                    margin-bottom: 10px;
                }
                .footer-contact {
                    font-size: 28px;
                    font-weight: 800;
                    color: #00f2fe;
                }
            </style>
        </head>
        <body>
            <!-- PAGE 1: FLYER -->
            <div class="page">
                <div class="flyer-hero">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 20px;">
                        <img src="${logoDataUri}" style="width: 50px; height: 50px; background: white; padding: 6px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.15);" />
                        <div style="font-size: 56px; font-weight: 900; line-height: 1; letter-spacing: -1px;"><span style="color: #00f2fe;">eT</span> <span style="color: white;">Tech</span></div>
                    </div>
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
                    <div style="font-size: 24px; color: #475569; font-weight: 600; margin-top: 10px;">We take over your entire tech stack so you can focus on running your business.</div>
                </div>
                
                <!-- Global Bar -->
                <div class="global-bar">
                    <span>www.ethanda.com</span>
                    <span>eT Tech</span>
                    <span>(346) 382-5020</span>
                </div>
            </div>

            <!-- PAGE 2: BROCHURE P1 -->
            <div class="page">
                <div class="cover-hero">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 20px;">
                        <img src="${logoDataUri}" style="width: 70px; height: 70px; background: white; padding: 8px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.15);" />
                        <div style="font-size: 72px; font-weight: 900; line-height: 1; letter-spacing: -1px;"><span style="color: #00f2fe;">eT</span> <span style="color: white;">Tech</span></div>
                    </div>
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
            </div>
            
            <!-- PAGE 3: BROCHURE P2 -->
            <div class="page">
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
                    <div style="margin-top: 10px; font-size: 18px; color: #94a3b8;">Our experts are ready to provide a free audit of your current tech setup.</div>
                </div>
                
                <!-- Global Bar -->
                <div class="global-bar">
                    <span>www.ethanda.com</span>
                    <span>eT Tech</span>
                    <span>(346) 382-5020</span>
                </div>
            </div>
        </body>
        </html>
        `;
        
        console.log("Setting content...");
        await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
        
        console.log("Generating Marketing Kit PDF...");
        await page.pdf({ 
            path: 'eT_Tech_Marketing_Kit.pdf', 
            format: 'A4',
            printBackground: true,
            margin: { top: '0', right: '0', bottom: '0', left: '0' }
        });

        await browser.close();
        console.log("Marketing Kit PDF generated successfully!");
    } catch(err) {
        console.error("Error generating Marketing Kit:", err);
        process.exit(1);
    }
})();
