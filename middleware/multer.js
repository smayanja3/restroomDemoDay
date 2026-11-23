const multer = require("multer");

// multer runs before controller so if the error is too big it never gets

module.exports = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 10 * 1024 * 1024 },   // 10 MB, the free Cloudinary limit for images
    fileFilter: (req, file, cb) => {
        // check the file's real type, not its name: covers jpg, png, webp, heic...
        if (file.mimetype.startsWith('image/')) {
            cb(null, true)
        } else {
            cb(new Error('Please upload an image file.'), false)
        }
    },
})
