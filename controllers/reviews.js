const cloudinary = require("../middleware/cloudinary");
const Review = require('../models/review')

module.exports = {
    createReview: async (req, res) => {
        try {
            //Upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);

            console.log('Request body,', req.body)

            await Review.create({
                review: req.body.review,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                likes: 0,
                restroom: req.params.id
            });
            console.log("Thanks for the Review!");
            res.redirect(`/restrooms/${req.params.id}`); // <--- maybe need comma
        } catch (err) {
            console.log(err);
        }
    },
};