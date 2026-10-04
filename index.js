const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Store uploaded file in memory
const upload = multer({
  storage: multer.memoryStorage()
});

// Home page
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// File Metadata API
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {

  if (!req.file) {
    return res.status(400).json({
      error: 'Please upload a file.'
    });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Start server
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});