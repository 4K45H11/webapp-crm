const express = require('express')
const router = express.Router()

const {addNewLead, readAllLead, updateLeadById, deleteLeadById, readLeadById} = require('../controllers/lead.controller')
const {addNewComment, readAllLeadCommnets} = require('../controllers/comment.controller')

//add new lead
router.post('/new',addNewLead)

//update lead by id
router.post('/:id',updateLeadById)

//read all leads with optional query filter
router.get('/',readAllLead)

//read leads by lead id

router.get('/:id',readLeadById)

//delete lead by id
router.delete('/:id',deleteLeadById)

//post comments routes in lead
router.post('/comments/:id',addNewComment)

//read all comments from a specific lead
router.get('/comments/:id',readAllLeadCommnets)

module.exports = router;