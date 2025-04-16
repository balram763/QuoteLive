const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    // host:"smtp-relay.brevo.com",
    // port:587,
    // secure:false,
    service : 'gmail',
    auth : {
        user: process.env.email,
        pass: process.env.code,
    },
})

const sendOTP = async (email,otp) => {
    // console.log(otp)
    const mailOptions = {
      from: "amanbalram0@gmail.com", 
      to: email,
      subject: "Your OTP for QuotLive Authentication",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 10px;">
          <h2>🔐 QuotLive Authentication</h2>
          <p>Your One-Time Password (OTP) is:</p>
          <h1 style="color: #007bff;">${otp}</h1>
          <p>This OTP is valid for 5 minutes. Do not share it with anyone.</p>
          <br/>
          <small>If you didn't request this, please ignore this email.</small>
        </div>
      `,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      // console.log("OTP Email sent: " + info.response);
      return true;
    } catch (err) {
      // console.error("Failed to send OTP:", err);
      return false;
    }
  };
  



module.exports = {transporter,sendOTP};

