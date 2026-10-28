const mongoose = require('mongoose')

const restroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxLength: [100, 'Name must be 100 characters or less']
    },
    address: {
        type: String,
        required: true,
        trim: true,
        maxLength: [200, 'Address must be 200 characters or less']
    },
    isFree: { type: Boolean, default: false },
    is24Hours: { type: Boolean, default: false },
    hours: { type: String, default: '' }
}, { timestamps: true })

module.exports = mongoose.model('Restroom', restroomSchema)