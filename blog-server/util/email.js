// utils/email.js
const nodemailer = require('nodemailer');

// 创建邮件传输器（以QQ邮箱为例）
const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',      // QQ邮箱SMTP服务器
  port: 465,                // 端口
  secure: true,             // 使用SSL
  auth: {
    user: '2363577442@qq.com',  // 你的邮箱
    pass: 'usptkcrcbttoebad' // 邮箱授权码，不是登录密码
  }
});

// 生成随机验证码
function generateVerificationCode() {
  return Math.random().toString().slice(2, 8); // 6位数字验证码
}

// 发送验证码邮件
async function sendVerificationCode(email) {
  const code = generateVerificationCode();
  const mailOptions = {
    from: '2363577442@qq.com',
    to: email,
    subject: '久别的博客注册验证码',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">欢迎注册</h2>
        <p>您的注册验证码为：</p>
        <div style="background: #f4f4f4; padding: 10px; border-radius: 5px; font-size: 24px; font-weight: bold; color: #e74c3c; text-align: center; letter-spacing: 5px;">
          ${code}
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          为了避免到期失效，请尽快使用。
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, code };
  } catch (error) {
    console.error('发送邮件失败:', error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  sendVerificationCode
}