const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnimalSchema = new Schema({
    OwnerID: {
        type: String,
        required: true
    },
    RanchID: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Breed: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        default: 1,
        min: 0,
        max: 50
    },
    BodyWeight: {
        type: Number,
        required: true,
        min: 0,
        max: 5000
    },
    MatureWeight: {
        type: Number,
        required: true,
        min: 0,
        max: 5000
    },
    DaysPregnant: {
        type: Number,
        required: true,
        min: 0,
        max: 500
    },
    ConditionScore: {
        type: Number,
        default: 1,
        min: 1,
        max: 5
    },
    DaysInMilk: {
        type: Number,
        default: 0,
        min: 0,
        max: 5000
    },
    LactationNumber: {
        type: Number,
        default: 0,
        min: 0,
        max: 9999
    },
    AgeAtFirstCalving: {
        type: Number,
        default: 0,
        min: 0,
        max: 500
    },
    CalfBirthW: {
        type: Number,
        default: 0,
        min: 0,
        max: 500
    },
    CalfTemp: {
        type: Number
    },
    CalvingInterval: {
        type: Number,
        default: 0
    },
    DesiredADG: {
        type: Number,
        default: 0
    },
    MilkProduction: {
        type: Number,
        required: true
    },
    MilkFat: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    MilkProtein: {
        type: Number,
        required: true
    },
    Lactose: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    createDate: {
        type: Date,
        default: Date.now
    }

}, { versionKey: false })


const Animal = mongoose.model('animal', AnimalSchema)
module.exports = { Animal }