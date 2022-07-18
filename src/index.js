const express = require('express')
const mongoose = require('mongoose')
const route = require('./routes/routes.js')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect("mongodb+srv://praffulbansal123:Bansal%400966@cluster0.d27ax.mongodb.net/PB-Project1-DB?retryWrites=true&w=majority",{
    useNewUrlParser: true
})
.then( () => console.log("MongoDB is connected"))
.catch( err => console.log(err))

app.use('/', route)

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app is running on port' + (process.env.PORT || 3000))
})
