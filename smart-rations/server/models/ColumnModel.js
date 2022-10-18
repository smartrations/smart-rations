const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ColumnSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 128
    },
    createDate: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

const Column = mongoose.model('column', ColumnSchema)
module.exports = { Column }