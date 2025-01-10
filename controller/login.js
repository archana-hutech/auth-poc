const express = require('express');
const { loginUtility } = require('../utility/login');
const router = express.Router()

router.post("/login", async (req, res) => {
  try {
    console.log("login success........");
    const userExist = await loginUtility(
      req?.body?.email,
      req?.body?.mobile,
      req?.body?.password
    );
    res.status(userExist?.statusCode).json(userExist);
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "failed to login",
      error: error.message,
    });
  }
});

module.exports = router;
