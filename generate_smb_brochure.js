const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    try {
        console.log("Launching browser for Brochure...");
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
                }
                
                /* PAGE 1: COVER & VALUE PROP */
                .cover-hero {
                    background: linear-gradient(135deg, #0b1120 0%, #1e1b4b 100%);
                    color: white;
                    padding: 80px 50px;
                    text-align: center;
                    border-bottom: 15px solid #00f2fe;
                }
                .logo {
                    width: 140px;
                    margin-bottom: 30px;
                    background: white;
                    padding: 12px;
                    border-radius: 12px;
                }
                h1 {
                    font-size: 56px;
                    margin: 0;
                    line-height: 1.1;
                    font-weight: 800;
                }
                .highlight {
                    color: #00f2fe;
                }
                .cover-content {
                    padding: 60px 50px;
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
                
                /* PAGE 2: BEFORE & AFTER / SERVICES */
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
                
                .footer {
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
            <!-- PAGE 1 -->
            <div class="page">
                <div class="cover-hero">
                    <img src="${logoDataUri}" class="logo" />
                    <h1>Small Business.<br>Big <span class="highlight">Technology.</span></h1>
                </div>
                <div class="cover-content">
                    <div class="big-text">We handle the tech.<br>You handle the business.</div>
                    <div class="description">
                        Most local businesses are losing thousands of dollars a month because their website is outdated, they miss phone calls while on the job, or they are paying for 10 different expensive software subscriptions. eThanda Technologies partners with local businesses to solve this.
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
            </div>
            
            <!-- PAGE 2 -->
            <div class="page">
                <div class="page-header">
                    <h2>The eThanda Difference</h2>
                </div>
                <div class="page-content">
                    
                    <div class="compare-box">
                        <div class="before">
                            <div class="compare-title">❌ Before eThanda</div>
                            <div class="compare-text">You are up on a ladder or under a sink. A customer calls, but you can't answer. They call the next guy on Google and you lose a $500 job.</div>
                        </div>
                        <div class="after">
                            <div class="compare-title">✅ After eThanda</div>
                            <div class="compare-text">You miss a call. Our system instantly texts the customer: "Sorry we missed you! How can we help?" They text back, and you secure the lead.</div>
                        </div>
                    </div>

                    <div class="compare-box">
                        <div class="before">
                            <div class="compare-title">❌ Before eThanda</div>
                            <div class="compare-text">Your website was built in 2012. It looks bad on mobile, loads slowly, and Google hides it from local search results.</div>
                        </div>
                        <div class="after">
                            <div class="compare-title">✅ After eThanda</div>
                            <div class="compare-text">You have a gorgeous, blazing-fast website with a "Text Us" button. It ranks on Google and turns local traffic into paying customers.</div>
                        </div>
                    </div>
                    
                    <div class="compare-box">
                        <div class="before">
                            <div class="compare-title">❌ Before eThanda</div>
                            <div class="compare-text">You pay monthly for Mailchimp, Calendly, QuickBooks, Square, and a CRM, but none of them talk to each other.</div>
                        </div>
                        <div class="after">
                            <div class="compare-title">✅ After eThanda</div>
                            <div class="compare-text">We consolidate your software, saving you hundreds a month, and automate your workflow so everything runs smoothly.</div>
                        </div>
                    </div>

                </div>
                
                <div class="footer">
                    <div class="footer-text">Ready to completely upgrade your business?</div>
                    <div class="footer-contact">Call or Text: (346) 382-5020</div>
                    <div style="margin-top: 10px; color: #94a3b8;">www.ethanda.com &nbsp;|&nbsp; contactus@ethanda.com</div>
                </div>
            </div>
        </body>
        </html>
        `;
        
        console.log("Setting content...");
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        
        console.log("Generating Brochure PDF...");
        await page.pdf({ 
            path: 'eThanda_SMB_Brochure.pdf', 
            format: 'A4',
            printBackground: true,
            margin: { top: '0', right: '0', bottom: '0', left: '0' }
        });

        await browser.close();
        console.log("Brochure PDF generated successfully!");
    } catch(err) {
        console.error("Error generating Brochure:", err);
        process.exit(1);
    }
})();
