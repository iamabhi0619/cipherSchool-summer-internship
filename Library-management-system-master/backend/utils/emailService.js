const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send confirmation email
const sendConfirmationEmail = async (to, name, email, password) => {
  const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-bottom: 1px solid #e9ecef;">
          <h2 style="color: #2c3e50; margin: 0;">Welcome, ${name}!</h2>
        </div>
        
        <div style="padding: 30px 20px;">
          <p style="margin-bottom: 20px;">Thank you for registering with us. Here are your account details:</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Password:</strong> ${password}</p>
          </div>
          
          <p style="font-size: 14px; color: #7f8c8d; margin-bottom: 0;">
            If you did not request this account, please contact our support team immediately.
          </p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; text-align: center; 
                    font-size: 12px; color: #7f8c8d; border-top: 1px solid #e9ecef;">
          <p style="margin: 0;">© ${new Date().getFullYear()} ReadHive. All rights reserved.</p>
        </div>
      </div>
    `;

  try {
    await transporter.sendMail({
      from: `ReadHive <${process.env.EMAIL_USER}>`,
      to,
      subject: "🎉 Welcome to ReadHive - Your Email is Registered!",
      html: htmlContent,
    });
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error.message);
    throw error;
  }
};

module.exports = {
  sendConfirmationEmail,
};
