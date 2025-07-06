const mongoose = require('mongoose')

const SalesAgent = require('../models/salesAgent.model')

const createSalesAgent = async (newAgent)=>{
    try {
        const data = new SalesAgent(newAgent)
        const savedData = await data.save()

        // if(savedData) console.log('new sales agent saved successfully')
            
        return savedData;
    } catch (error) {
        throw error;
    }
}

module.exports = {createSalesAgent}