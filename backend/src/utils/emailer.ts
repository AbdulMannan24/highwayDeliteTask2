import { createTransport } from 'nodemailer';
const systemMail = "coding.projects.mailer@gmail.com";

// Email Setup
const transporter = createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
        user: systemMail,
        pass: process.env.PASSWORD
    }
})

export async function sendEmail(email: string, link: string) {
    if (!email) {
        return {
            message: 'failed'
        }
    }
    const mailOptions = {
        from: systemMail,
        to: email,
        subject: 'Verify your Email',
        text: `Please click on this click to verify your email: ${link}`,
    };
    
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return {
            message: "success",
            details: info.response
        };
    } catch (error) {
        console.error(error);
        return {
            message: "failed"
        }
    }
}
