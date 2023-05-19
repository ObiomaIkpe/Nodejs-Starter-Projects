require('dotenv').config();

const connectDB = require('./db/connect')
const product = require('./models/product')
const jsonProducts =  require('./products.json');

const start = async(req, res) => {
    await connectDB(process.env.MONGO_URI)
    await product.create(jsonProducts)
    process.exit(0)
}

start();