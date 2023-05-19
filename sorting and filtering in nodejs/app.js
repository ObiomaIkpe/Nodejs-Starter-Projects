require('dotenv').config();

const notFoundMiddleware = require('./middleware/not-found');
const errorhandlerMiddleware = require('./middleware/error-handler');

const express =  require('express');
const app = express();
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');
require('express-async-errors')



//middlewares
//app.use(express.static())
app.use(express.json())

app.get('/', (req, res) => { 
    res.send("store API<a href='/api/vi/products'>products route")
})
app.use('/api/v1/products', productsRouter);

//products routes
app.use(notFoundMiddleware)
app.use(errorhandlerMiddleware)

const port = process.env.PORT || 9000;


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log (`server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start();