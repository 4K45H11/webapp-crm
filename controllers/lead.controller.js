const mongoose = require('mongoose')
const { createNewLead } = require('../utils/lead.util')
const SalesAgent = require('../models/salesAgent.model')
const Lead = require('../models/lead.model')

const addNewLead = async (req, res) => {
    try {
        // validation for salesAgent

        //handle validity of ObjectId of agent->which throws cast error if object Id format is not valid.

        if (!mongoose.Types.ObjectId.isValid(req.body.salesAgent)) {
            return res.status(400).json({ message: 'salesAgent id format is not right' })
        }

        //handle salesAgent existance
        const existed = await SalesAgent.findById(req.body.salesAgent)
        //console.log(existed)
        if (!existed) {
            return res.status(404).json({ error: 'Sales Agent Not Found' })
        }

        const savedLead = await createNewLead(req.body)
        const populatedLead = await savedLead.populate('salesAgent')
        if (populatedLead) {
            res.status(201).json(populatedLead)
        }
    } catch (error) {
        // console.log(error.name)
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message })
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const validQueryParams = ['salesAgent', 'status', 'tags', 'source']
const validStatus = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed']
const validTags = ['High Value', 'Follow-up', 'Urgent']
const validSource = ['Website', 'Referral', 'Cold Call', 'Advertisement', 'Email', 'Other']
const readAllLead = async (req, res) => {
    try {

        const query = {}
        if (req.query.salesAgent) {
            const salesAgentId = req.query.salesAgent
            if (!mongoose.Types.ObjectId.isValid(salesAgentId)) {
                return res.status(400).json({ error: 'Sales agent id is not valid.' })
            }
            query.salesAgent = salesAgentId;

        }

        if (req.query.status) {
            const queryStatus = req.query.status
            if (!validStatus.includes(queryStatus)) {
                return res.status(400).json({ error: "Invalid input: 'status' must be one of ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed']." })
            }
            query.status = queryStatus;
        }

        if (req.query.source) {
            const querySource = req.query.source;
            if (!validSource.includes(querySource)) {
                return res.status(400).json({ error: "Invalid input: 'source' must be one of ['Website', 'Referral', 'Cold Call', 'Advertisement', 'Email', 'Other']." })
            }
            query.source = querySource;
        }

        if (req.query.tags) {
            // const url = '/leads?tags=' + encodeURIComponent('High Value,Follow-up');
            const queryTags = req.query.tags.split(',');

            const isValid = queryTags.every(tag => validTags.includes(tag))

            if (!isValid) {
                return res.status(400).json({ error: "Invalid input: 'tag' must be one of ['High Value', 'Follow-up','Urgent']." })
            }

            query.tags = { $all: queryTags };
            // $all is used to find all of the tags are included, $in ->altest one
        }

        // console.log(query)
        const data = await Lead.find(query).populate('salesAgent')
        // const populatedData = await data.populate('salesAgent')

        if (data) {
            res.status(200).json(data)
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const readLeadById = async (req, res) => {
    try {
        const leadId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(leadId)) {
            return res.status(400).json({ error: 'Lead agent id is not valid.' })
        }

        const data = await Lead.findById(leadId).populate('salesAgent')

        if(data){
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateLeadById = async (req, res) => {
    try {
        const leadId = req.params.id;
        //params are required parameters, queries are 
        // optional filters

        if (!mongoose.Types.ObjectId.isValid(leadId)) {
            return res.status(400).json({ error: 'Lead id format is not right.' })
        }
        const existed = await Lead.findById(leadId)

        if (!existed) {
            return res.status(404).json({ error: 'Lead with given id not found' })
        }

        //records the closing time
        if (req.body.status === 'Closed') {
            req.body.closedAt = new Date()
        }

        const updatedLead = await Lead.findByIdAndUpdate(leadId, req.body, { new: true }).populate('salesAgent')

        res.status(200).json(updatedLead)

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message })
        }
        res.status(500).json({ error: error.message });
    }
}

const deleteLeadById = async (req, res) => {
    try {
        const leadId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(leadId)) {
            return res.status(400).json({ error: 'Lead id format is not right.' })
        }
        const existed = await Lead.findById(leadId)
        if (!existed) {
            return res.status(404).json({ error: 'Lead with given id not found' })
        }

        const deletedData = await Lead.findByIdAndDelete(leadId)

        if (deletedData) {
            //204 for no body
            res.status(200).json({ message: 'deleted the lead successfully' })
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { addNewLead, readAllLead, readLeadById,updateLeadById, deleteLeadById };