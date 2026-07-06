const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    try {
        console.log("Launching browser...");
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        
        console.log("Reading logo...");
        const logoPath = path.join(__dirname, 'logo.png');
        const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });
        const logoDataUri = `data:image/png;base64,${logoBase64}`;
        
        const dateToday = "June 5, 2026";

        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Offer Letter</title>
            <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Inter', sans-serif;
                    color: #0A192F;
                    line-height: 1.5;
                    margin: 0;
                    padding: 10px 30px;
                    background-color: #fff;
                }
                .header {
                    display: flex;
                    align-items: center;
                    border-bottom: 2px solid #00E5FF;
                    padding-bottom: 15px;
                    margin-bottom: 25px;
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
                    font-size: 18px;
                    color: #0A192F;
                    text-align: center;
                    margin-bottom: 15px;
                    font-weight: 600;
                }
                .date {
                    text-align: right;
                    margin-bottom: 15px;
                    font-size: 13px;
                }
                .content {
                    font-size: 13px;
                }
                .content p {
                    margin-bottom: 10px;
                }
                .footer {
                    margin-top: 35px;
                    font-size: 11px;
                    color: #64748B;
                    text-align: center;
                    border-top: 1px solid #E2E8F0;
                    padding-top: 15px;
                }
                .signature-block {
                    margin-top: 50px;
                    display: flex;
                    justify-content: space-between;
                }
                .signature-line {
                    width: 200px;
                    border-bottom: 1px solid #0A192F;
                    margin-top: 60px;
                    margin-bottom: 5px;
                    position: relative;
                }
                .sig-img {
                    position: absolute;
                    bottom: 0px;
                    left: 10px;
                    max-width: 150px;
                    max-height: 55px;
                    mix-blend-mode: multiply;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <img src="${logoDataUri}" class="logo" />
                <span class="company-name">eThanda Technologies</span>
            </div>

            <div class="date">
                <strong>Date:</strong> ${dateToday}
            </div>

            <h1>Offer of Employment</h1>

            <div class="content">
                <p>Dear Renukadevi Jaganathan,</p>

                <p>We are absolutely thrilled to extend this formal offer of employment for the position of <strong>Senior Developer</strong> at <strong>eThanda Technologies</strong>. We believe your technical expertise, architectural vision, and passion for excellence are a perfect match for our fast-growing global team.</p>

                <p><strong>Position Details:</strong><br>
                Role: Senior Developer</p>

                <p><strong>Compensation:</strong><br>
                Your starting annualized base salary will be <strong>$128,000 USD</strong>, paid bi-weekly in accordance with the company's standard payroll schedule.</p>

                <p><strong>Benefits & Perks:</strong><br>
                As a full-time senior engineer at eThanda Technologies, you will be eligible for our comprehensive benefits package. This includes premium health coverage, paid time off (PTO), a flexible global working environment, and continuous professional development allowances to ensure you remain at the cutting edge of enterprise IT consulting.</p>

                <p>Please note that this offer of employment is contingent upon the successful completion of standard background checks and verification of your eligibility to work.</p>

                <p>To accept this offer, please sign and date this letter below and return it to us. We are incredibly excited to welcome you aboard and look forward to building the future of enterprise legacy modernization together!</p>

                <div class="signature-block">
                    <div>
                        <p>Sincerely,</p>
                        <div class="signature-line"></div>
                        <p><strong>Kiruthiga</strong><br>
                        eThanda Technologies</p>
                    </div>

                    <div>
                        <p><strong>Candidate Acceptance:</strong></p>
                        <div class="signature-line"></div>
                        <p>Renukadevi Jaganathan<br>
                        Date: _______________</p>
                    </div>
                </div>
            </div>

            <div class="footer">
                eThanda Technologies | 74 West Sandalbranch Circle, Spring, Texas - 77382 | hr@ethanda.com
            </div>
        </body>
        </html>
        `;
        
        console.log("Setting content...");
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        
        console.log("Generating PDF...");
        await page.pdf({ 
            path: 'eThanda_Technologies_Offer_Letter_Final.pdf', 
            format: 'A4',
            printBackground: true,
            margin: { top: '30px', right: '30px', bottom: '30px', left: '30px' }
        });

        await browser.close();
        console.log("PDF generated successfully!");
    } catch(err) {
        console.error("Error generating PDF:", err);
        process.exit(1);
    }
})();
