const mongoose = require('mongoose')

const blog =  mongoose.model('Blog',{

    name: {
        type: String,
       
    },
    description: {
        type: String,
       
    },
    image:{
        type:String,
        
    }   

})

module.exports = blog