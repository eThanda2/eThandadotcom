const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    try {
        console.log("Launching browser for brochure...");
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
            <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
            <style>
                body {
                    margin: 0; padding: 0; font-family: 'Inter', sans-serif;
                    background-color: #0d1426; color: #e2e8f0;
                    width: 794px; /* A4 width */
                }
                .page {
                    width: 794px; height: 1122px; /* A4 height */
                    padding: 60px; box-sizing: border-box;
                    position: relative; overflow: hidden;
                    background: radial-gradient(circle at top right, rgba(0,229,255,0.1), transparent 50%),
                                radial-gradient(circle at bottom left, rgba(168,85,247,0.1), transparent 50%);
                }
                .logo-container {
                    display: flex; align-items: center; margin-bottom: 50px;
                }
                .logo { width: 80px; height: 80px; margin-right: 20px; }
                .brand { font-family: 'Cinzel', serif; font-size: 32px; font-weight: 700; color: #fff; }
                
                .hero-text { font-size: 48px; font-weight: 700; line-height: 1.2; margin-top: 80px; color: #fff; }
                .cyan-text { color: #00E5FF; }
                .sub-hero { font-size: 20px; line-height: 1.6; margin-top: 30px; color: #94a3b8; }
                
                .glass-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    padding: 30px;
                    margin-bottom: 30px;
                }
                .card-title { font-size: 24px; color: #00E5FF; margin-top: 0; margin-bottom: 15px; }
                .card-text { font-size: 16px; line-height: 1.6; color: #cbd5e1; margin: 0; }
                
                .footer {
                    position: absolute; bottom: 60px; left: 60px; right: 60px;
                    display: flex; justify-content: space-between;
                    border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;
                    font-size: 14px; color: #64748b;
                }
                .page-break { page-break-after: always; }
            </style>
        </head>
        <body>
            <!-- PAGE 1 -->
            <div class="page page-break">
                <div class="logo-container">
                    <img src="${logoDataUri}" class="logo" />
                    <span class="brand">eThanda Technologies</span>
                </div>
                
                <div class="hero-text">
                    Bridging <span class="cyan-text">Legacy Systems</span><br>
                    and Modern Cloud Architecture.
                </div>
                
                <p class="sub-hero">
                    eThanda LLC (d/b/a eThanda Technologies) is an agile, fast-growing IT consulting and software engineering startup. We empower our prospective clients to secure, scale, and seamlessly modernize their mission-critical business systems for the digital age.
                </p>
                
                <div style="margin-top: 100px;">
                    <div class="glass-card">
                        <h3 class="card-title">Agile & International</h3>
                        <p class="card-text">Currently operating out of the United States and India—with proposed expansions into the UK and Australia—to deliver focused, round-the-clock excellence to our prospective partners.</p>
                    </div>
                </div>
                
                <div class="footer">
                    <span>www.ethanda.com</span>
                    <span>Corporate Profile</span>
                </div>
            </div>

            <!-- PAGE 2 -->
            <div class="page">
                <h2 style="font-size: 36px; margin-top: 0; color: #fff;">Our Core Pillars</h2>
                
                <div class="glass-card">
                    <h3 class="card-title">1. Legacy System Modernization</h3>
                    <p class="card-text">Specialized expertise in IBM i/AS400, RPG 400, RPG ILE (Free Format), CL, DB2, and SYNON/COOL 2E. We modernize legacy codebases using cutting-edge tools like ASNA Monarch to bring your critical systems into the future without disruption.</p>
                </div>
                
                <div class="glass-card">
                    <h3 class="card-title">2. Infrastructure & High Availability</h3>
                    <p class="card-text">Ensuring 100% uptime with advanced MIMIX Data Replication, comprehensive Disaster Recovery (HA/DR) administration, and 24/7 system monitoring to protect your most valuable data assets.</p>
                </div>
                
                <div class="glass-card">
                    <h3 class="card-title">3. Modern Cloud Engineering</h3>
                    <p class="card-text">Building highly scalable, secure, cloud-native applications utilizing Java 17, Spring Boot, React, Angular, and AWS. We handle complex cloud migrations and API-first ecosystem development.</p>
                </div>
                
                <div style="margin-top: 60px; text-align: center;">
                    <h3 style="color: #A855F7; margin-bottom: 10px;">Contact Us</h3>
                    <p style="color: #cbd5e1; font-size: 16px;">
                        +1(346) 382-5020 | contactus@ethanda.com<br>
                        74 West Sandalbranch Circle, Spring, TX 77382
                    </p>
                </div>
                
                <div class="footer">
                    <span>www.ethanda.com</span>
                    <span>Services Overview</span>
                </div>
            </div>
        </body>
        </html>
        `;
        
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        
        await page.pdf({ 
            path: 'eThanda_Corporate_Brochure_V2.pdf', 
            format: 'A4',
            printBackground: true
        });

        await browser.close();
        console.log("Brochure generated successfully!");
    } catch(err) {
        console.error("Error generating Brochure:", err);
        process.exit(1);
    }
})();
