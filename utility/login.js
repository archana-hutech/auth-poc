const db = require("../models/db")
const { Op } = require("sequelize");
const { createJWTtoken } = require("./auth")
const bcrypt = require('bcrypt');
const user = db.user

async function loginUtility(email, mobile, password) {
  try {
    const userInfoExist = await user.findOne({
      where: { [Op.or]: [{ email }, { mobile }] },
    });
    
    // Check if user exists
    if (!userInfoExist) {
        return { success: false, statusCode: 401, message: "Unauthorized" };
      }
    // Validate password
    const isPasswordValid = await bcrypt.compare(password, userInfoExist.password);
    if (!isPasswordValid) {
      return { success: false, statusCode: 401, message: "Unauthorized" };
    }
    const userDetails = userInfoExist;
    if (userDetails?.id) {
      const tokenIfo = await createJWTtoken(
        userDetails?.id,
        userDetails?.email,
        userDetails?.mobile
      );
      return {
        success: true,
        statusCode: 200,
        ...tokenIfo,
        message: "user login success",
      };
    } else {
      return { success: false, statusCode: 401, message: "unauthorized" };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      statusCode: 500,
      message: "internal server error",
      error: error.message,
    };
  }
}
  
  module.exports = {loginUtility}
  