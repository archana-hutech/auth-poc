const { Op } = require("sequelize");
const db = require("../models/db")
const bcrypt = require('bcrypt');
const user = db.user

async function signup(username, email, password, mobile) {
  try {
    // Check if the user already exists
    const existingUser = await user.findOne({ where: {[Op.or]:[{email},{mobile}]}  });
    if (existingUser) {
      return {
        success: false,
        status: 400,
        message: "User already exists",
      };
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const crtUser = await user.create({
      username,
      email,
      mobile,
      password: hashedPassword,
    });
    if (crtUser) {
      return {
        success: true,
        status: 200,
        message: "User created successfully",
        user: crtUser,
      };
    } else {
      return { success: false, status: 400, message: "User not created" };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      status: 500,
      message: "Internal server error",
      error: error.message,
    };
  }
}

module.exports = {
  signup,
};   
