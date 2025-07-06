const mongoose = require('mongoose')

const { createNewComment } = require('../utils/comment.util')

const Comment = require('../models/comment.model')
const Lead = require('../models/lead.model')

const addNewComment = async (req, res) => {
    try {
        const savedData = await createNewComment({ ...req.body, lead: req.params.id })
        // populate author before returning
        const populatedComment = await savedData.populate('author');
        if (populatedComment) {
            res.status(201).json(populatedComment)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const readAllLeadCommnets = async (req, res) => {
    try {
        const leadId = req.params.id;


        if (!mongoose.Types.ObjectId.isValid(leadId)) {
            return res.status(400).json({ error: 'lead id format is not right.' })
        }

        const exists = await Lead.findById(leadId)
        if (!exists) {
            res.status(404).json({ error: `Lead with ID ${leadId} not found.` })
        }

        const data = await Comment.find({ lead: leadId }).populate('author')

        if (data) {
            res.status(200).json(data)
        }

    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = { addNewComment, readAllLeadCommnets }