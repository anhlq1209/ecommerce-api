const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const dbConnect = require('./config/dbConnect')
const PORT = process.env.PORT || 4000
const authRoute = require('./routes/authRoute')
const productRoute = require('./routes/productRoute')
const { notFound, errorHandler } = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')


dbConnect()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())


app.use('/api/user', authRoute)
app.use('/api/product', productRoute)


app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})