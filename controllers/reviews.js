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
            res.redirect(`/restrooms/${req.params.id}`); // <--- maybe need comma
        } catch (err) {
            console.log(err)
            res.redirect(`/restrooms/${req.params.id}`);
        }
    },

    deleteReview: async (req, res) => {
        try{
            const review = await Review.findById(req.params.id)

            //review gone send back to browser list
            if(!review){
                return res.redirect('/restrooms')
            }
            // only the author can delte their own comments
            if(review.author.toString() !== req.user._id.toString()){
                return res.redirect(`/restrooms/${review.restroom}`)
            }
            //delete the cloudinary photo which removes from gallery also
            if(review.cloudinaryId){
                await cloudinary.uploader.destroy(review.cloudinaryId)
            }
            await review.deleteOne()
            await updateRating(review.restroom)
            res.redirect(`/restrooms/${review.restroom}`)
        } catch (err) {
            console.log(err)
            res.redirect('/restrooms')
        }

    },
};