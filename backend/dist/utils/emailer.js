"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = require("nodemailer");
const systemMail = "coding.projects.mailer@gmail.com";
// Email Setup
const transporter = (0, nodemailer_1.createTransport)({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
        user: systemMail,
        pass: process.env.PASSWORD
    }
});
function sendEmail(email, link) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email) {
            return {
                message: 'failed'
            };
        }
        const mailOptions = {
            from: systemMail,
            to: email,
            subject: 'Verify your Email',
            text: `Please click on this click to verify your email: ${link}`,
        };
        try {
            const info = yield transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
            return {
                message: "success",
                details: info.response
            };
        }
        catch (error) {
            console.error(error);
            return {
                message: "failed"
            };
        }
    });
}
exports.sendEmail = sendEmail;
