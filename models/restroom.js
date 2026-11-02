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
    hours: { type: String, default: '' },
    neighborhood: { type:String, trim: true, maxLength:60 },
    babyChanging: { type: Boolean, default: false},
    cleanliness: {
        type: Number,
        min: [1, 'Cleanliness is 1 to 5'],
        max: [5, 'Cleanliness is 1 to 5'],
    },
    notes: { type: String, trim: true, maxLength: [1000, 'Notes must be 1000 characters or less']},
}, { timestamps: true })

module.exports = mongoose.model('Restroom', restroomSchema)