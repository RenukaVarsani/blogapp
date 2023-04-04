const mongoose = require('mongoose')

const blog =  mongoose.model('Blog',{

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

})

module.exports = blog