const express = require('express')
const { getReportInPipeline, getReportsLastWeek } = require('../controllers/report.controller')


const router = express.Router()

//get last week closed leads
router.get('/last-week',getReportsLastWeek)

//get in-pipeline leads
router.get('/pipeline',getReportInPipeline)

module.exports = router