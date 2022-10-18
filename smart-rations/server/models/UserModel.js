const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const Joi = require('joi')

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        min: 6,
        max: 100
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 128
    },
    name: {
        type: String,
        required: true,
        unique: false,
        min: 1,
        max: 64
    },
    surname: {
        type: String,
        required: true,
        unique: false,
        min: 1,
        max: 64
    },
    createDate: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

const validateUserSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).required(),
    surname: Joi.string().min(2).required(),
})
const validateUserLoginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
})

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (e) {
        console.log(`Şifrelenme sırasında hata: ${e}`)
    }
})

UserSchema.methods.checkPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}

const User = mongoose.model('User', UserSchema)
module.exports = { User, validateUserSchema, validateUserLoginSchema }