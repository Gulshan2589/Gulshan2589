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

const port = 5000




app.listen(port, () => console.log(`Node JS Server started at port ${port}!`))