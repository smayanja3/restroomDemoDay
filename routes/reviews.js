const express = require("express");
const router = express.Router();
const { uploadImage } = require('../middleware/multer')
//const upload = require("../middleware/multer"); ^^ took its place
const reviewsController = require("../controllers/reviews");
const { isLoggedIn } = require("../middleware/auth");


router.post("/createReview/:id", isLoggedIn, uploadImage, reviewsController.createReview);

//router.put("/likeReview/:id", commentsController.likeReview);

//router.delete("/deleteReview/:id", commentsController.deletePost);

module.exports = router;