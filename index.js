const express = require('express')
const cors = require('cors')
require('dotenv').config()

const {initializeDatabase} = require('./db/db.connect')
const PORT = process.env.PORT|| 5000

const salesAgentRoutes  = require('./routes/salesAgent.route')
const leadsRoutes = require('./routes/lead.route')
const reportRoutes = require('./routes/report.route')

const corsObject = {
    origin:"*",
    //later change to  origin: ['http://localhost:3000', 'https://frontend.vercel'],
    credentials:false
    //later change to credentials: true
}

//initializing the server
const app = express()

//connect to database
initializeDatabase()



//middle wares
app.use(express.json())
app.use(cors(corsObject))

//routes
app.get('/',async(req,res)=>{
    res.status(202).json('welcome to the CRM server')
})
app.use('/agents',salesAgentRoutes)
app.use('/leads',leadsRoutes)
app.use('/report',reportRoutes)

//listing the server
app.listen(PORT,()=>console.log(`server is running on port: ${PORT}`))