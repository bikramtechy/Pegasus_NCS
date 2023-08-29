module.exports = {
    mailOptions: {
        from: '22@gmail.com',
        to: 'to@email.com',
        subject: 'Subject of your email',
        html: '<p>Your html here</p>'
    },
    emailconfig: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: true,
        service: 'gmail',
        auth: {
            user: '022@gmail.com',
            pass: 'fovy'
        }
    },
}