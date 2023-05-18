const mongoose = require('mongoose');

const connectDB = (URL) => { 
  try {
  console.log('connection to db successful')
  return mongoose.connect(URL)
  } catch (error) {
    console.log(error)
  }
  

}
