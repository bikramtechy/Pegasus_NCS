const express = require("express")
const router = new express.Router;
const auth = require("./authorganization")
const patient = require("./patient")
const user = require("./user")
const department = require('./department');
const student = require('./student')
const course = require('./course');
const school = require('./school')
const setting = require('./setting')
const assignment = require('./assignment')
const studentView = require('./studentView')
const customform = require('./customform')
const assessmentType = require('./assessmentType')
router.use(auth)
router.use(patient)
router.use(user)
router.use(department);
router.use(student);
router.use(course)
router.use(school)
router.use(setting)
router.use(assignment)
router.use(studentView)
router.use(customform)
router.use(assessmentType)

module.exports = router;