const express = require('express')
const {addNewSalesAgent, readAllSalesAgents} = require('../controllers/salesAgent.controller')

const router = express.Router()

//add new agent
router.post('/new',addNewSalesAgent)

//read all agents
router.get('/',readAllSalesAgents)

module.exports = router;