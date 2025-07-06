const mongoose = require('mongoose')
require('dotenv').config()

const mongoUrl = process.env.MONGODB;


const initializeDatabase = async()=>{
    try {
       const res =  await mongoose.connect(mongoUrl)
       if(res){
        console.log('successfully connected to the database.')
       }
    } catch (error) {
        console.log('could not connect to the database')
    }
}

module.exports = {initializeDatabase}