const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 8080

const routes = require('./routes/api')

// live mongodb
// cuwhjGakWLZEp95l
// const MONGODB_URI = 'mongodb+srv://rhinax:cuwhjGakWLZEp95l@cluster0-qwdet.mongodb.net/test?retryWrites=true&w=majority'

// local mongodb
const MONGODB_URI = 'mongodb://localhost:27017/mern_test'

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!!!')
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// HTTP request logger
app.use(morgan('tiny'))
app.use('/api', routes)

app.listen(PORT, console.log(`Server is starting at ${PORT}`))