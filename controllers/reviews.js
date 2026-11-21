const cloudinary = require("../middleware/cloudinary");
const Review = require('../models/review')

module.exports = {
    createReview: async (req, res) => {
        try {
            let image = null
            let cloudinaryId = null
            if(req.file){
                //Upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            image = result.secure.url
            cloudinaryId = result.public_id
            }
            
            console.log('Request body,', req.body)

            await Review.create({
                review: req.body.review,
                image,
                cloudinaryId,
                likes: 0,
                restroom: req.params.id,
                author: req.user._id
            });
            console.log("Thanks for the Review!");
            res.redirect(`/restrooms/${req.params.id}`); // <--- maybe need comma
        } catch (err) {
            console.log(err)
            res.redirect(`/restrooms/${req.params.id}`);
        }
    },
};