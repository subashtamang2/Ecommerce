const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();

const router = express.Router(); // ✅ Added router

// ✅ Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ POST route to upload an image to Cloudinary
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ✅ Function to handle stream upload to Cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result); // ✅ return result on success
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(fileBuffer).pipe(stream); // ✅ pipe the file
      });
    };

    // ✅ Call the streamUpload function and wait for result
    const result = await streamUpload(req.file.buffer);

    // ✅ Respond with the image URL
    res.json({ imageUrl: result.secure_url });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
