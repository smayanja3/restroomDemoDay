const mongoose = require('mongoose')

function connectDB() {
    const configURL = process.env.MONGODB_URI
    mongoose.connect(configURL)
    mongoose.connection.on('connected', () => {
        console.log(`Connected to MongoDB: ${mongoose.connection.name}`)
    })
    mongoose.connection.on('error', (err) => {
        console.log('NOT != MongoDB:', err.message)
    })
}

module.exports = connectDB