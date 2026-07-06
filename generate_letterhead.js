const fs = require('fs');
const path = require('path');
const docx = require('docx');
const { Document, Packer, Paragraph, TextRun, Header, Footer, ImageRun, AlignmentType, BorderStyle } = docx;

const logoBuffer = fs.readFileSync(path.join(__dirname, 'logo.png'));

const doc = new Document({
    sections: [{
        properties: {
            page: {
                margin: { top: 1500, right: 1000, bottom: 1000, left: 1000 }
            }
        },
        headers: {
            default: new Header({
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new ImageRun({
                                data: logoBuffer,
                                transformation: { width: 60, height: 60 }
                            }),
                            new TextRun({
                                text: " eThanda Technologies",
                                font: "Cinzel",
                                size: 48,
                                bold: true,
                                color: "0A192F"
                            })
                        ],
                        border: {
                            bottom: { color: "00E5FF", space: 10, style: BorderStyle.THICK, size: 20 }
                        }
                    })
                ]
            })
        },
        footers: {
            default: new Footer({
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({ text: "eThanda Technologies | 74 West Sandalbranch Circle, Spring, Texas - 77382", size: 20, color: "64748B" }),
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({ text: "+1(346) 382-5020 | contactus@ethanda.com | www.ethanda.com", size: 20, color: "64748B" })
                        ]
                    })
                ]
            })
        },
        children: [
            new Paragraph({
                children: [
                    new TextRun({ text: "[Type your letter here]", color: "888888", size: 24 })
                ]
            })
        ]
    }]
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("eThanda_Letterhead.docx", buffer);
    console.log("Letterhead generated.");
});
