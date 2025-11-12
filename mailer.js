const nodemailer = require("nodemailer");
const readline = require("readline-sync");
const path = require("path");
require("dotenv").config();

// === Step 1: Setup transporter ===
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const subject = "Sharing My Profile for Future Opportunities - MCA 2025 Fresher";
const body = `
Dear Recruiter,

I hope this message finds you well.

I’m Lokeshwar Panuganti, a 2025 MCA pass-out and an aspiring Software Engineer skilled in the MERN stack (MongoDB, Express.js, React.js, Node.js). 
I have experience developing responsive web applications, integrating RESTful APIs, and building secure, scalable backend systems.

As a fresher from the 2025 batch, I’m eager to begin my professional journey and contribute to a team where I can apply my technical skills, learn continuously, and grow as a developer. 
I’m sharing my profile for your consideration for any suitable openings in Software or Web Development roles in the future.

Please find my resume attached for your review. Thank you for your time and consideration.

Best regards,  
Lokeshwar Panuganti  
📧 panugantilokeshwar@gmail.com  
📞 +91 9177621222  
🌐 LinkedIn: https://www.linkedin.com/in/lokeshwar-panuganti-13511a249/  
🌐 GitHub: https://github.com/lokeshwarp01
`;

const resumePath = path.join(__dirname, "LokeshwarP@7.pdf");

// === Step 2: Email sending function ===
async function sendMail(to) {
    try {
        await transporter.sendMail({
            from: `"Lokeshwar Panuganti" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text: body,
            attachments: [
                {
                    filename: "Lokeshwar_Panuganti_Resume.pdf",
                    path: resumePath,
                },
            ],
        });
        console.log(`Sent successfully to: ${to}`);
    } catch (err) {
        console.error(`Failed to send to ${to}:`, err.message);
    }
}

// === Step 3: Continuous input loop ===
(async function main() {
    console.log("\nMailer started! (type 'exit' to quit)\n");

    while (true) {
        const input = readline.question("Enter recruiter email(s) (comma separated): ");

        if (input.toLowerCase() === "exit") {
            console.log("\nExiting mailer. Goodbye!\n");
            break;
        }

        const emailList = input.split(",").map(e => e.trim()).filter(e => e.length > 0);
        if (emailList.length === 0) {
            console.log("No valid email addresses provided.\n");
            continue;
        }

        console.log("\nSending emails...\n");
        for (const email of emailList) {
            await sendMail(email);
        }

        console.log("\nBatch complete! You can enter more emails or type 'exit' to quit.\n");
    }
})();
