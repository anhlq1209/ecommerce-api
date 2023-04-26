const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')


// Create a product
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title)
    }
    const newProduct = await Product.create(req.body)
    res.json({
      message: "Hey it's product post route"
    })
  } catch (error) {
    throw new Error(error)
  }

})

// Update a product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title)
    }
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })
    res.json(updateProduct)
  } catch (error) {
    throw new Error(error)
  }
})

// Delet a product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const deleteProduct = await Product.findByIdAndDelete(id, req.body, {
      new: true,
      runValidators: true
    })
    res.json(deleteProduct)
  } catch (error) {
    throw new Error(error)
  }
})

// Get a product
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const findProduct = await Product.findById(id)
    res.json(findProduct)
  } catch (error) {
    throw new Error(error)
  }
})

// Get all product
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query }
    const excludeFields = ['page', 'sort', 'limit', 'fields']
    excludeFields.forEach(el => delete queryObj[el])

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

    let query = Tour.find(JSON.parse(queryObj))

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ")
      query = query.sort(sortBy)
    } else {
      query = query.sort('-createdAt')
    }

    // Limiting the fields
    if (req.query.limit) {
      const fields = req.query.fields.split(",").join(" ")
      query = query.select(fields)
    } else {
      query = query.select('-__v')
    }

    // Pagination
    const page = req.query.page
    const limit = req.query.limit
    const skip = (page - 1) * limit
    query = query.skip(skip).limit(limit)
    if (req.query.page) {
      const productCount = await Product.countDocumentsBy()
      if (skip >= productCount) throw new Error('This Page does not exists')
    }


    const products = await query
    res.json(products)
  } catch (error) {
    throw new Error(error)
  }
})


module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct
}
