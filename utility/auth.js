const jwt = require("jsonwebtoken");
const db = require('../models/db');

async function createJWTtoken(id, email, mobile) {
  try {
    //create JWT token which includes id & email
    const token = jwt.sign(
      { user: { id, email, mobile } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );
    return {idtoken:token, refreshToken:"na"}
  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }
}

async function verifyJWTtoken(token) {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        return decoded
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createJWTtoken,
    verifyJWTtoken
}   
