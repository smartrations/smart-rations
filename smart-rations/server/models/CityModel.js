const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CitySchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        min: 1,
        max: 100
    },
    name: {
        type: String,
        required: true,
        min: 1,
        max: 128
    }
}, { versionKey: false })

CitySchema.pre('save', async function (next) {
    throw ("Bu işlem şimdilik yapılamıyor")
})

const City = mongoose.model('City', CitySchema)
module.exports = { City }