const Lead = require('../models/lead.model')

const createNewLead = async(newLead)=>{
    try {
        const data = new Lead(newLead)
        const savedData = await data.save()

        // if(savedData){
        //     console.log('new lead is generated')
        // }
        return savedData;
    } catch (error) {
        throw error;
    }
}

module.exports = {createNewLead}