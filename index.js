const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const dbConnect = require('./config/dbConnect')
const PORT = process.env.PORT || 4000
const authRoute = require('./routes/authRoute')
const productRoute = require('./routes/productRoute')
const blogRoute = require('./routes/blogRoute')
const productCategoryRoute = require('./routes/productCategoryRoute')
const blogCategoryRoute = require('./routes/blogCategoryRoute')
const brandRoute = require('./routes/brandRoute')
const { notFound, errorHandler } = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')


dbConnect()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())


app.use('/api/user', authRoute)
app.use('/api/product', productRoute)
app.use('/api/blog', blogRoute)
app.use('/api/category', productCategoryRoute)
app.use('/api/blog-category', blogCategoryRoute)
app.use('/api/brand', brandRoute)


app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})