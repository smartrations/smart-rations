const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserPerms = new Schema({
    userID: {
        type: String,
        required: true,
        min: 1,
        max: 100
    },
    role: {
        type: String,
        min: 1,
        max: 100
    },
    permissions: {
        type: Object,
        required: false
    }
}, { versionKey: false })

const userPerms = mongoose.model('userpermissions', UserPerms)
module.exports = { userPerms }