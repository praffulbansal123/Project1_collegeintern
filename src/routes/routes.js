const express = require('express')
const router = express.Router()
const CollegeController =  require('../controllers/collegeController.js')
const InternController =  require('../controllers/internController.js')

router.post('/createCollege', CollegeController.createCollege)

router.get('/getCollegeDetails', CollegeController.getCollegeDetails)

router.post('/createIntern', InternController.createIntern)

module.exports = router