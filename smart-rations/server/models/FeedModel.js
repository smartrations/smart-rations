const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FeedSchema = new Schema({
    Name: {
        type: String,
        required: true,
        unique: true,
        min: 1,
        max: 64
    },
    Price: {
        type: Number,
        default: 0,
        required: false
    },
    DMFed: {
        type: Number,
        default: 0
    },
    Category: {
        type: String,
        required: true
    },
    EnergyEqClass: {
        type: String
    },
    ForageDescrp: {
        type: String
    },
    IFN: { // ONLY SYSTEM FEEDS
        type: String
    },
    UserID: {
        type: Object
    },
    City: {
        type: Number,
        default: 0
    },
    data: {
        type: Object,
        required: true
    }
}, { versionKey: false })

const Feed = mongoose.model('Feed', FeedSchema)
module.exports = { Feed }