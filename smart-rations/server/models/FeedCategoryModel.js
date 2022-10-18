const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        min: 1,
        max: 64
    }
}, { versionKey: false })

const FeedCategory = mongoose.model('FeedCategory', CategorySchema)
module.exports = { FeedCategory }