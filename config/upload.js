require("dotenv").config();
const multer = require("multer");
const DatauriParser = require("datauri/parser");
const path = require("path");

//multer setup
const storage = multer.memoryStorage();
const uploads = multer({ storage });

//datauri configuration
const buffer = new DatauriParser();
const URI = (req) => {
  return buffer.format(path.extname(req.file.originalname).toString(), req.file.buffer);
};

module.exports = { uploads, URI };
