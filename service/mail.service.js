const nodemailer = require("nodemailer");
const config = require("config");

class MailService {
    constructor(){
        this.transporter = nodemailer.createTransport({
            service:"gmail",
            host:config.get("smtp_host"),
            port:config.get("smtp_port"),
            secure: false,
            auth: {
                user: config.get("smtp_user"),
                pass: config.get("smtp_password"),
            },
        });
    }
    async sendMailActivationCode(toEmail, link){
        await this.transporter.sendMail({
            from: config.get("smtp_user"),
            to: toEmail,
            subject: "Auto-Shop akkauntini faollashtirish",
            text: "",
            html:`
            <div>
                <h2>
                    Akkauntni Faollashtirish Uchun Quyidagi Linkni Bosing:
                </h2>
                <a href="${link}">Akkauntni Faollashtirish</a>
             </div>
            `,
        });
    }
}

module.exports = new MailService
