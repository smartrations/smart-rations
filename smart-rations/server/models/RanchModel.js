const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RanchModel = new Schema({
    OwnerID: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true,
        min: 1,
        max: 128
    },
    Temperature: {
        type: Number,
        required: true,
        min: -50,
        max: 60
    },
    PrevTemperature: {
        type: Number,
        default: 0,
        min: -50,
        max: 60
    },
    WindSpeed: {
        type: Number,
        default: 0,
        min: 0,
        max: 60
    },
    Distance: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    Topography: {
        type: String,
        required: true
    },
    Trips: {
        type: Number,
        default: 0
    },
    HairDepth: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    CoatCondition: {
        type: String,
        required: true
    },
    HeatStress: {
        type: String,
        required: true
    },
    Grazing: {
        type: Boolean,
        default: false
    },
    NightCooling: {
        type: Boolean,
        default: false
    },
    createDate: {
        type: Date,
        default: Date.now
    }

}, { versionKey: false })

const Ranch = mongoose.model('ranch', RanchModel)
module.exports = { Ranch }