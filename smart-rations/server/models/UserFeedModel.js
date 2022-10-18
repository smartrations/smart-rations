const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserFeedSchema = new Schema({
    UserID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    FeedID: {
        type: String,
        required: true
    },
    DMFed: {
        type: Number,
        required: true
    },
    Price: {
        type: Number,
        default: 0
    }
}, { versionKey: false })

const UserFeed = mongoose.model('UserFeed', UserFeedSchema)
module.exports = { UserFeed }