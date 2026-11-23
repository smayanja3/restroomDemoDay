const cloudinary = require("../middleware/cloudinary");
const Review = require('../models/review')

module.exports = {
    createReview: async (req, res) => {
        try {
            let image = null
            let cloudinaryId = null
            if (req.file) {
                //Upload image to cloudinary
                //converts phone img HEIC to jpg
                const result = await cloudinary.uploader.upload(req.file.path, { format: 'jpg'});
                image = result.secure_url
                cloudinaryId = result.public_id
            }

            console.log('Request body,', req.body)

            await Review.create({
                review: req.body.review, //only || undefined if optional
                rating: req.body.rating,
                image,
                cloudinaryId,
                likes: 0,
                restroom: req.params.id,
                author: req.user._id
            });
            console.log("Thanks for the Review!");
            req.flash('reviewMessage', 'Thanks for your review!')
            res.redirect(`/restrooms/${req.params.id}`); // <--- maybe need comma
        } catch (err) {
            console.log(err)
            req.flash('reviewMessage', 'Sorry, your review could not be saved. Please try again.')
            res.redirect(`/restrooms/${req.params.id}`);
        }
    },
};