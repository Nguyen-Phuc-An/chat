const express = require("express");
const multer = require("multer");
const {
  uploadMedia,
  getMedia,
} = require("../controllers/media.controller");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadMedia);
router.get("/:id", getMedia);

module.exports = router;