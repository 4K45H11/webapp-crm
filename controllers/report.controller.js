const {getInPipelineLeads,getLastSevenDayClosedLeads} = require('../utils/report.util')
const getReportsLastWeek  = async(req,res)=>{
    try {
        const lastWeekClosed = await getLastSevenDayClosedLeads()

        res.status(200).json(lastWeekClosed)


    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getReportInPipeline = async(req,res)=>{
    try {
        const inPipeline = await getInPipelineLeads()
        res.status(200).json({totalLeadsInPipeline:inPipeline})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {getReportInPipeline,getReportsLastWeek}
