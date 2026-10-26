const mongoose = require('mongoose')

const restroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    isFree: { type: Boolean, default: false },
    is24Hours: { type: String, default: false },
}, { timestamps: true })

module.exports = mongoose.model('Restroom', restroomSchema)