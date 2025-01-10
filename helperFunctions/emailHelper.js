const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  // Configure your email transport (using a test service like Mailtrap or a real SMTP server)
  const transporter = nodemailer.createTransport({
    service: "gmail", // Replace with your email provider (or use a test service like Mailtrap in development)
    auth: {
      user: "archana@hutechsolutions.com",
      pass: "rgur jqvp rrfm pgpf",
    },
  });

  const mailOptions = {
    from: "archana@hutechsolutions.com",
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
}

async function sendResetEmail(email, resetLink) {  
  const subject = "Password Reset Request";
  const text = `Click the following link to reset your password: ${resetLink}`;
  await sendEmail(email, subject, text);
}

module.exports = {
  sendEmail,
  sendResetEmail,
};
