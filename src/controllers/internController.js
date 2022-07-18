const CollegeModel = require("../models/collegeModel.js")
const InternModel = require("../models/internModel.js")

const isValid1 = function(data){
    if(typeof (data) === 'undefined' || data === null) return false
    if(typeof(data) === 'string' && data.trim().length <1) return false
    if(typeof (data) !== 'string') return false
    return true
}

const isValid2 = function(data){
    if(typeof (data) === 'undefined' || data === null) return false
    if(typeof(data) !== 'number') return false
    return true
}

const createIntern = async function(req,res) {
    try{
        const request = req.body

        // -------------------------------Validation starts here--------------------------------------//
        if(Object.keys(request).length<1){
            return res.status(400).send({status: false, msg: "Please provide the intern data"})
        }

        if(!isValid1(request.name)){
            return res.status(400).send({status: false, msg: "Name provided is invalid"})
        }
        
        if(!isValid1(request.email)){
            return res.status(400).send({status: false, msg: "Please provide the email"})
        }
        
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(request.email)){
            return res.status(400).send({status: false, msg: "The email provided is invalid"})
        }

        const isEmailNotUnique = await InternModel.findOne({ email: request.email })
        if (isEmailNotUnique) {
            return res.status(400).send({ status: false, msg: "Intern with this email is already present in the DB" })
        }
        
        if(!isValid2(request.mobile)){
            return res.status(400).send({status: false, msg: "Please provide the mobile no"})
        }
        
        if(!/^[6-9]\d{9}$/.test(request.mobile)){
            return res.status(400).send({status: false, msg: "The mobile no provided is invalid"})
        }

        const isMobileNotUnique = await InternModel.findOne({ mobile: request.mobile })
        if (isMobileNotUnique) {
            return res.status(400).send({ status: false, msg: "Intern with this mobile no is already present in the DB" })
        }
        
        const collegeByName = await CollegeModel.findOne({name: request.collegeName})
        
        if(!collegeByName){
            return res.status(400).send({status: false, msg: "No college present in the DB with this name"})
        }     
    // -----------------------------------Validation ends here-------------------------------------------//    
        const collegeId = collegeByName._id
        request.collegeId = collegeId
        delete request.collegeName

        const newIntern = await InternModel.create(request)
        return res.status(201).send({ status: true, msg: "New Intern entry is successful", data: newIntern})

    }catch(err){
        return res.status(500).send({status: false, msg: err.message})
    }
}

module.exports = {createIntern}