const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Please write a review'],
        trim: true,
        maxLength: [500, 'Review can be up to 500 characters']
    },
    // optional not required
    image: {
        type: String,
    },
    cloudinaryId: {
        type: String,
    },
    //mongoose turns dropdown '4' into number
    rating: {
        type: Number,
        min: [1, 'Rating must be 1 to 5'],
        max: [5, 'Rating must be 1 to 5'],
        required: true
    },
    likes: {
        type: Number,
        default: 0,
    },
    restroom: { // <--- what its attached too
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restroom', // <- refernce another module
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User', required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // delete: {
    //     default: false
    // },
});

module.exports = mongoose.model('Review', ReviewSchema);

// need to create a link and delete button for ever review like auth
// in the for loop and then add the like and dislike logic in server or...
// is that MVC or would it go somewhere else.