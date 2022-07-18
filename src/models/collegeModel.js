const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is mandatory"],
        unique: [true, "this name is already present in DB"],
        trim: true
    },
    fullName: {
        type: String,
        required: [true, "full name is mandatory"],
        trim: true    
    },
    logolink: {type: String, required: [true,"logo is mandatory"]},
    isDeleted: {type: Boolean, default: false}
}, {timestamps: true})

module.exports = mongoose.model('College', collegeSchema)