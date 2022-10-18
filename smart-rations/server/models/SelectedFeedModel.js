const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SFeedSchema = new Schema({
    UserID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    feeds: {
        type: Array,
        required: true
    }
}, { versionKey: false })

const SelectedFeed = mongoose.model('SelectedFeed', SFeedSchema)
module.exports = { SelectedFeed }