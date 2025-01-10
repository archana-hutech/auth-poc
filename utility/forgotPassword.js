const { sendResetEmail } = require("../helperFunctions/emailHelper");
const db = require("../models/db");
const bcrypt = require('bcrypt');
const { createJWTtoken, verifyJWTtoken } = require("./auth");
const user = db.user

async function forgotPasswordUtility(email) {
    try {
        const userRecord = await user.findOne({ where: { email } });        
  if (!userRecord) {
    return { success: false, statusCode: 404, message: "User not found" };
  }

  // Create JWT token with user ID and expiry
  const token =  await createJWTtoken({userId:userRecord?.id})
  // const resetLink = `localhost:3001/api/user/reset-password?token=dummyToken123`;

  console.log("tokentoken", token);
  
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token?.idtoken}`;

  await sendResetEmail(email, resetLink);
  
  return { success: true };
        
    } catch (error) {
        console.log(error);       
    }
}

async function resetPasswordUtility(token, newPassword, confirmPassword) {
    try {      
        // First verify passwords match
        if (newPassword !== confirmPassword) {
            return {
                success: false,
                statusCode: 400,
                message: "Passwords do not match"
            };
        }

        // Verify the token and extract user ID
        const decoded = await verifyJWTtoken(token)        
        const userRecord = await user.findOne({ where: { id: decoded.user.id.userId } });
        
        if (!userRecord) {
            return { success: false, statusCode: 400, message: "user not found" };
        }

        // Hash and update the password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const { id } = userRecord.dataValues;

        await user.update({ password: hashedPassword }, { where: { id } });
        
        return { success: true };
            
    } catch (error) {
        console.log("error", error);
        return {
            success: false,
            statusCode: 400,
            message: "Invalid or expired token",
            error: error.message,
        };
    }
}

module.exports = {
    forgotPasswordUtility,
    resetPasswordUtility,
  }