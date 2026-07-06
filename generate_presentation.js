const pptxgen = require('pptxgenjs');
const pptx = new pptxgen();

pptx.layout = 'LAYOUT_16x9';

// Slide 1: Title
let slide1 = pptx.addSlide();
slide1.background = { color: "0A192F" };
slide1.addImage({ path: "logo.png", x: 4.5, y: 1.5, w: 1, h: 1 });
slide1.addText("eThanda Technologies", { x: 0, y: 3, w: "100%", align: "center", fontSize: 44, color: "FFFFFF", bold: true });
slide1.addText("Bridging Legacy Systems and Modern Cloud Applications", { x: 0, y: 4, w: "100%", align: "center", fontSize: 20, color: "00E5FF" });

// Slide 2: About Us
let slide2 = pptx.addSlide();
slide2.addText("About eThanda Technologies", { x: 0.5, y: 0.5, w: 8, h: 1, fontSize: 32, color: "0A192F", bold: true, border: { type: "bottom", pt: 2, color: "00E5FF" } });
slide2.addText("eThanda LLC (d/b/a eThanda Technologies) is an agile, fast-growing IT consulting and software engineering startup specializing in bridging the gap between legacy infrastructure and modern cloud architecture.\n\nOperating out of the United States and India (with proposed expansions into the UK and Australia), we partner with prospective clients to secure, scale, and seamlessly modernize their mission-critical business systems for the digital age.", { x: 0.5, y: 1.8, w: 8.5, h: 3, fontSize: 20, color: "333333" });

// Slide 3: Core Services
let slide3 = pptx.addSlide();
slide3.addText("Our Core Pillars", { x: 0.5, y: 0.5, w: 8, h: 1, fontSize: 32, color: "0A192F", bold: true, border: { type: "bottom", pt: 2, color: "00E5FF" } });
slide3.addText("1. Legacy System Modernization\nIBM i/AS400, RPG, CL, SYNON/COOL 2E, ASNA Monarch.\n\n2. Infrastructure & High Availability\nMIMIX Data Replication, HA/DR Administration, 24/7 Monitoring.\n\n3. Modern Cloud Engineering\nJava Full Stack, Spring Boot, React/Angular, AWS Cloud Migrations.", { x: 0.5, y: 1.8, w: 8.5, h: 3, fontSize: 20, color: "333333" });

// Slide 4: Contact
let slide4 = pptx.addSlide();
slide4.background = { color: "0A192F" };
slide4.addText("Let's Build the Future", { x: 0, y: 2, w: "100%", align: "center", fontSize: 36, color: "FFFFFF", bold: true });
slide4.addText("+1(346) 382-5020  |  contactus@ethanda.com  |  www.ethanda.com\n74 West Sandalbranch Circle, Spring, TX 77382", { x: 0, y: 3, w: "100%", align: "center", fontSize: 18, color: "A855F7" });

pptx.writeFile({ fileName: "eThanda_Corporate_Presentation.pptx" }).then(() => {
    console.log("Presentation generated.");
});
