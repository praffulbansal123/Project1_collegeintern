const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const validateEmail = function(email) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regexEmail.test(email)
}

const validateMobile = function(mobile) {
    let regexMobile = /^[6-9]\d{9}$/
    return regexMobile.test(mobile)
}

const internSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"name is mandatory"],
        trim: true
    },
    email:{
        type: String,
        required: [true, "email is mandatory"],
        lowercase: true,
        validate: [validateEmail, "please enter the valid email"],
        unique: [true, "this email already exits in the DB"],
        trim: true
    },
    mobile:{
        type: Number,
        required: [true, "mobile is mandatory"],
        validate: [validateMobile, "please enter the valid mobile number"],
        unique: [true, "this mobile already exits in the DB"],
        trim: true
    },
    collegeId:{type: ObjectId, ref: "College"},
    isDeleted: {type: Boolean, default: false}
}, {timestamps: true})

module.exports = mongoose.model('Intern',internSchema)