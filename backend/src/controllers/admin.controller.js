const Media = require("../models/Media");

exports.getAllMedia = async (req, res) => {
  const data = await Media.find().sort({ createdAt: -1 });
  res.json(data);
};