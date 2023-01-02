const express = require('express')
const dbConnect = require('./dbConnect')
const app = express()
app.use(express.json())
const userRoute = require('./routes/usersRoute')
app.use('/api/users/', userRoute)
const transactionsRoute = require('./routes/transcationsRoute')
app.use('/api/transactions/' , transactionsRoute)
const faceRoute = require('./routes/faceRoute')
app.use('/api/face/' , faceRoute)

const port = process.env.PORT || 5000

if(process.env.NODE_ENV === 'production')
{
     app.use('/' , express.static('client/build'))

     app.get('*' , (req, res)=>{
         res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
     })
}


app.listen(port, () => console.log(`Node JS Server started at port ${port}!`))