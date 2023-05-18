
const mongoose = require('mongoose');



connectDB = (URL) => {
    console.log('connection to DB successful')
    return mongoose.connect(URL)
    
}

module.exports = connectDB;
