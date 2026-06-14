const Media = require("../models/Media");
const cloudinary = require("../utils/cloudinary");

exports.uploadMedia = async (req, res) => {
  try {
    const file = req.file;
    const roomId = req.body.roomId;

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
    });

    const media = await Media.create({
      url: result.secure_url,
      type: result.resource_type,
      roomId,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    res.json({ mediaId: media._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMedia = async (req, res) => {
  const media = await Media.findById(req.params.id);

  if (!media) return res.status(404).send("Not found");

  const now = new Date();

  if (now > media.expiresAt) {
    return res.status(403).send("Expired");
  }

  res.redirect(media.url);
};