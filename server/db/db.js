const mongoose = require('mongoose')

//mongodb+srv://renukavarsani:hariom77@cluster0.cyycvte.mongodb.net/?retryWrites=true&w=majority

mongoose.connect('mongodb://127.0.0.1:27017/api',{

}).then(()=>{
    console.log("Connected Succesfully");
})