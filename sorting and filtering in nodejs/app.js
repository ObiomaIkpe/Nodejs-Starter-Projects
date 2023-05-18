const express =  require('express');
const app = express()
const connectDB = require('./db/connect')







const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
    } catch (error) {
        console.log(error)
    }
}

start();