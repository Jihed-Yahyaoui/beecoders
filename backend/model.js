const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: String,
    price: Number,
    photo: String,
})

module.exports = mongoose.model('beecoders', schema, 'Beecoders')