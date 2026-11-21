const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        require: true,
    },
    cloudinaryId: {
        type: String,
        require: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    restroom: { // <--- what its attached too
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restroom', // <- refernce another module
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