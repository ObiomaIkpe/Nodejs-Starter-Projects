require('dotenv').config();
const express = require('express');
const app = express();
const connectDB =require('./db/connect');
const notFound = require('./middleware/notFound');
const errorhandlerMiddleWare = require('./middleware/error-handler');

const routes = require('./routes/router');

//middleware
app.use(express.static('./public'))
app.use(express.json()); // to be able to get our data from req.body

app.use('/api/v1/tasks', routes);

const port = process.env.PORT || 9000;

app.use(notFound);
app.use(errorhandlerMiddleWare);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}`))
        
    } catch (error) {
      console.log(error)  
    }
}


start();