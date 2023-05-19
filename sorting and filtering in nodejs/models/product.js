const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'must provide a name']

    },
    price:{
        type: Number,
        required: [true, 'must specify product price']

    },
    featured:{
        type: Boolean,
        default: false,

    },
    rating:{
        type: Number,
        default: 4.5,

    },
    createdAt:{
        type: Date,
        default: Date.now(),

    },
    company:{
        type: String,

        enum: {

            values: ['ikea', 'liddy', 'marcos', 'caressa'],
            
        }
    }
})

module.exports = mongoose.model('Product', productSchema)