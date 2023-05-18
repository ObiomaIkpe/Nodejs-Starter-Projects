const mongoose = require('mongoose');

const TaskSchema =  new mongoose.Schema(
    {
        name:{
            type: String,
            maxLength: [20, 'cannot exceed 20 characters'],
            trim: true,
            required: [true, 'must provide a name']
        },
        completed:{
            type: Boolean,
            default: false,
        },

    }
)

module.exports = mongoose.model('Task', TaskSchema)