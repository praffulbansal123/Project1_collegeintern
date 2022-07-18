const CollegeModel = require("../models/collegeModel.js")
const InternModel = require("../models/internModel.js")

const isValid = function (data) {
    if (typeof (data) === 'undefined' || data === null) return false
    if (typeof (data) === 'string' && data.trim().length < 1) return false
    if(typeof (data) !== 'string') return false
    return true
}
const createCollege = async function (req, res) {
    try {

        let request = req.body

        // -------------------------------Validation starts here--------------------------------------//
        if (Object.keys(request).length < 1) {
            return res.status(400).send({ status: false, mssg: "Please provide the college data" })
        }


        if (!isValid(request.name)) {
            return res.status(400).send({ status: false, msg: "Name provided is invalid" })
        }

        if (!isValid(request.fullName)) {
            return res.status(400).send({ status: false, msg: "Full Name provided is invalid" })
        }

        if (!isValid(request.logolink)) {
            return res.status(400).send({ status: false, msg: "Logo link provided is invalid" })
        }

        const isNotUnique = await CollegeModel.findOne({ name: request.name })
        if (isNotUnique) {
            return res.status(400).send({ status: false, msg: "This name is already present in the DB" })
        }
        // -----------------------------------Validation ends here-------------------------------------------//


        const college = await CollegeModel.create(request)
        return res.status(201).send({ status: true, msg: "New College entry is successful", data: college })
    } catch (err) {
        return res.status(500).send({ staus: false, msg: err.message })
    }
}


const getCollegeDetails = async function (req, res) {
    try {
        const request = req.query
        const collegeName = request.collegeName
        console.log(JSON.parse(collegeName))
        if (Object.keys(request).length < 1) {
            return res.status(400).send({ status: false, mssg: "Please provide the input for college data" })
        }

        if(!isValid(JSON.parse(collegeName))) {
            return res.status(400).send({status: false, msg: "College name provided is invalid"})
        }

        const collegeByName = await CollegeModel.findOne({name: collegeName})
        if(!collegeByName) {
            return res.status(400).send({status: false, msg: "This college is not present in the DB"})
        }

        const {name, fullName, logolink } = collegeByName
        const collegeId = collegeByName._id

        const internsByCollegeId = await InternModel.find({collegeId: collegeId}).select({_id:1, name:1, email:1, mobile:1})

        const data = {
            name: name,
            fullName: fullName,
            logolink: logolink,
            interns: internsByCollegeId
        }
        return res.status(201).send({status: true, data: data})

    } catch (err) {
        return res.status(500).send({status: false, msg: err.message})
    }
}
module.exports = { createCollege, getCollegeDetails }