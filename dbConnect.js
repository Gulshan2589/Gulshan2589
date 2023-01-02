const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://gulsanvarma:Gulshan%403265@cluster0.o3aqqr8.mongodb.net/Hisabbook' , {useNewUrlParser : true , useUnifiedTopology : true})

const connection = mongoose.connection

connection.on('error', err => console.log(err))

connection.on('connected' , () => console.log('Mongo DB Connection Successfull'))