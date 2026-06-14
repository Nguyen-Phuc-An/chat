const express = require("express");
const router = express.Router();
const Media = require("../models/Media");

// 🔐 check admin key
router.get("/media", async (req, res) => {
  const key = req.headers["x-admin-key"];

  if (key !== "123456") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const data = await Media.find().sort({ createdAt: -1 });

  res.json(data);
});

module.exports = router;