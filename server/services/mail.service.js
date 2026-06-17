import nodemailer from "nodemailer";

// Create the transporter once, outside of the functions
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Function for Password Reset
export const sendPasswordResetEmail = async (email, resetLink) => {
    try {
        const mailOptions = {
            from: process.env.FROM_EMAIL || '"URL Shortener" <no-reply@example.com>',
            to: email,
            subject: "Password Reset Request",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Password Reset Request</h2>
                    <p>You requested a password reset. Click the button below to reset your password:</p>
                    <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                    <p>If you didn't request this, you can safely ignore this email.</p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Password reset email sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.log("Error in send password reset email service:", error);
        return false;
    }
};

// Function for a Welcome Email
export const sendWelcomeEmail = async (email, name) => {
    try {
        const mailOptions = {
            from: process.env.FROM_EMAIL || '"URL Shortener" <no-reply@example.com>',
            to: email,
            subject: "Welcome to URL Shortener!",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Welcome, ${name}!</h2>
                    <p>Thanks for signing up for our URL Shortener service.</p>
                    <p>We're excited to have you on board!</p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Welcome email sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.log("Error in send welcome email service:", error);
        return false;
    }
};

export const sendPasswordResetOtpEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: process.env.FROM_EMAIL || '"URL Shortener" <no-reply@example.com>',
            to: email,
            subject: "Password Reset OTP",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Password Reset Request</h2>
                    <p>You requested to reset your password. Use the following 6-digit OTP to reset your password:</p>
                    <h1 style="color: #007bff; letter-spacing: 5px;">${otp}</h1>
                    <p>This OTP is valid for 10 minutes. If you didn't request this, you can safely ignore this email.</p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Password reset OTP email sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.log("Error in send password reset OTP email service:", error);
        return false;
    }
};

// This is generic email function but not been used yet...
// export const sendEmail = async (to, subject, html) => {
//     try {
//         const mailOptions = {
//             from: process.env.FROM_EMAIL || '"URL Shortener" <no-reply@example.com>',
//             to,
//             subject,
//             html,
//         };

//         const info = await transporter.sendMail(mailOptions);
//         console.log("Email sent: %s", info.messageId);
//         return true;
//     } catch (error) {
//         console.log("Error in send email service:", error);
//         return false;
//     }
// };

export const urlShortnedMail = async (email, longUrl, shortUrl) => {
    try {
        const mailOptions = {
            from: process.env.FROM_EMAIL || '"URL Shortener" <no-reply@example.com>',
            to: email,
            subject: "Your URL has been shortened",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Your URL has been shortened</h2>
                    <p>Here is your shortened URL:</p>
                    <p><strong>Long URL:</strong> ${longUrl}</p>
                    <p><strong>Short URL:</strong> ${shortUrl}</p>
                    <p>If you did not shorten this URL, you can ignore this email.</p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("URL shortened email sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.log("Error in URL shortened email service:", error);
        return false;
    }
};

export const sendVerificationEmail = async (email, verificationLink) => {
    try {
        const mailOptions = {
            from: process.env.FROM_EMAIL || '"URL Shortener" <no-reply@example.com>',
            to: email,
            subject: "Email Verification",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Email Verification</h2>
                    <p>Click the button below to verify your email:</p>
                    <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verify Email</a>
                    <p>If you did not create this account, you can ignore this email.</p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Verification email sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.log("Error in send verification email service:", error);
        return false;
    }
};