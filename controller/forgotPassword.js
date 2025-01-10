const express = require('express');
const { forgotPasswordUtility, resetPasswordUtility } = require('../utility/forgotPassword');
const router = express.Router()

router.post("/forgot-password", async(req, res) => {
    try {
        const { email } = req.body;        
        // Check if the email was provided
        if (!email) {
           return res.status(400).json({ error: "Email is required" });
        }
        const result = await forgotPasswordUtility(email)
        // res.status(fpwd?.statusCode).json(fpwd);
        if (result.success) {
            res.status(200).json({ message: "Password reset link has been sent to your email" });
          } else {
            res.status(result.statusCode || 500).json({ error: result.message });
          }

    } catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Something Went Wrong Please Try again",
            error: error.message,
        })
    }
})

router.post("/reset-password", async(req, res) => {
    try {
        const { token, newPassword, confirmPassword } = req.body;
        
        // Check if all required fields are present
        if (!token || !newPassword || !confirmPassword) { 
            return res.status(400).json({ 
                error: "Token, new password and confirm password are required" 
            });
        }

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ 
                error: "Passwords do not match" 
            });
        }

        // Password validation regex
        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                error: "Password must contain at least 8 characters, including uppercase, lowercase letters and numbers"
            });
        }
        
        const result = await resetPasswordUtility(token, newPassword, confirmPassword);
        
        if (result.success) {
            res.status(200).json({ 
                message: "Password has been reset successfully" 
            });
        } else {
            res.status(result.statusCode || 500).json({ 
                error: result.message 
            });
        }
    } catch (error) {
        res.status(500).json({ 
            error: "Internal server error", 
            details: error.message 
        });
    }
});

module.exports = router;

