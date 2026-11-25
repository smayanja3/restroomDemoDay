const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const reviewsController = require("../controllers/reviews");
const { isLoggedIn } = require("../middleware/auth");


router.post("/createReview/:id", isLoggedIn, upload.single('file'), reviewsController.createReview);

//router.put("/likeReview/:id", commentsController.likeReview);

router.delete("/deleteReview/:id",isLoggedIn, reviewsController.deleteReview);

module.exports = router;