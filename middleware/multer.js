const multer = require("multer");
const path = require("path");

// multer runs before controller so if the error is too big it never gets to the catch

const upload = multer({
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

// handled one image uploads and send a message if there is an error
function uploadImage(req, res, next){
  upload.single('file')(req, res, (err) => {
    if(err) {
      const message = err.code === 'LINIT_FILE_SIZE'
      ? 'Photo to large reduce to 10 MB'
      : err.message
      req.flash('reviewMessage', message)
      return res.redirect(`/restrooms/${req.params.id}`)
    }
    next()
  })
}

module.exports = { uploadImage }