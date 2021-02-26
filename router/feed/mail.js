const nodemailer = require('nodemailer');
const secret = require("../../config/secret.json");

module.exports.sendMail = async () => {
    let transporter = nodemailer.createTransport({
        service: secret.nodemailer.service,
        host: secret.nodemailer.host,
        port: secret.nodemailer.port,
        secure: secret.nodemailer.secure,
        auth: {
          user: secret.nodemailer.user,
          pass: secret.nodemailer.pass,
        },
    });
    
    let info = await transporter.sendMail({
        // 보내는 곳의 이름과, 메일 주소를 입력
        from: `"Casper Bot" <${secret.nodemailer.user}>`,
        // 받는 곳의 메일 주소를 입력
        to: 'whdals7979@gmail.com',
        // 보내는 메일의 제목을 입력
        subject: 'Casper Bot',
        // 보내는 메일의 내용을 입력
        // text: 일반 text로 작성된 내용
        // html: html로 작성된 내용
        text: 'test',
        html: `<b>test</b>`,
    });
}