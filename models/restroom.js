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
        required: [true, 'Adress is required'],
        trim: true,
        maxLength: [200, 'Address must be 200 characters or less']
    },
    isFree: { type: Boolean },
    is24Hours: { type: Boolean },
    hours: { type: String, default: '' },
    babyChanging: { type: Boolean },
    lat: { type: Number },
    lng: { type: Number },
    externalId: { type: Number, unique: true, sparse: true }, // id from Refudge API
},
    { timestamps: true })

//google maps directions
//Strings should be URL-encoded, so an address such as "City Hall, New York, NY" should be converted to City+Hall%2C+New+York%2C+NY 
restroomSchema.virtual('mapsUrl').get(function () {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(this.address)}`
})
module.exports = mongoose.model('Restroom', restroomSchema)