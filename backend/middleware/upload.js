const multer= require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload/"); // Store images in 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

// Multer instance

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Limit to 10MB
});

module.exports = upload;
