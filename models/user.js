const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 6,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Restroom'}],
}, { timestamp: true })
 
// creates hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hash(password, 10)
}
// checks if the password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema)