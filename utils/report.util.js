const Leads = require('../models/lead.model')

const  getLastSevenDayClosedLeads = async()=>{
    try {
        const leadsData = await Leads.find();
        const lastDateToCheck = Date.now() - 7*1000*3600*24

        //filtering last 7 days closed leads
        const desiredData = leadsData.filter(l=>new Date(l.closedAt)>=lastDateToCheck)

        return desiredData;
    } catch (error) {
        throw error;
    }
}

const getInPipelineLeads = async()=>{
    try{
        const leadsData = await Leads.find();
        const desiredData = leadsData.filter(l=>l.status!=='Closed')

        return desiredData.length;
    }
    catch(error){
        throw error;
    }
}

module.exports = {getInPipelineLeads,getLastSevenDayClosedLeads}