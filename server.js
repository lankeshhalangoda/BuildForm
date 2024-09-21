// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); // Add this line for handling CORS
const app = express();

// Enable CORS
app.use(cors());

// Set up storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Store in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file names
  },
});

const upload = multer({ storage });

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Upload route
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({ filePath: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ message: 'Failed to upload file' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
