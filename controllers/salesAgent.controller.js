const {createSalesAgent} = require('../utils/salesAgent.util')
const SalesAgent = require('../models/salesAgent.model')

const addNewSalesAgent = async(req,res)=>{
    try {
        const savedData = await createSalesAgent(req.body);
        if(savedData){
            res.status(201).json(savedData)
        }
    } catch (error) {
        //handles the thrown error for conflicting field 
        // values, unique field in mongoDb model(creates 
        // unique index)
        if(error.code===11000){
            res.status(409).json({error:`Sales agent with email '${req.body.email}' already exists.`})
        }
        res.status(400).json({error: error.message})
    }
}

const readAllSalesAgents = async(req,res)=>{
    try {
        const data = await SalesAgent.find()
        if(data){
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports = {addNewSalesAgent,readAllSalesAgents}

