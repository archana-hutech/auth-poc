const express = require('express')
const router = express.Router()
const { signup } = require('../utility/signup')

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, mobile } = req.body;
    // Validate required fields
    if (!username || !email || !password || !mobile) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const result = await signup(username, email, password, mobile);
    // Send response based on result status
    res.status(result.status).json({
      success: result.success,
      message: result.message,
      user: result.user || null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
