const BCategory = require('../models/blogCategoryModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodbId')


// Create blog category
const createBCategory = asyncHandler(async (req, res) => {
  try {
    const newBCategory = await BCategory.create(req.body)
    res.json(newBCategory)
  } catch (error) {
    throw new Error(error)
  }
})

// Get a blog category
const getBCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)

  try {
    const getBCategory = await BCategory.findById(id)
    res.json(getBCategory)
  } catch (error) {
    throw new Error(error)
  }
})

// Get all blog category
const getAllBCategory = asyncHandler(async (req, res) => {
  try {
    const getAllBCategory = await BCategory.find()
    res.json(getAllBCategory)
  } catch (error) {
    throw new Error(error)
  }
})

// Update a blog category
const updateBCategory = asyncHandler(async (req, res) => {
  const {id} = req.params
  validateMongoDbId(id)

  try {
    const updateBCategory = await BCategory.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })
    res.json(updateBCategory)
  } catch (error) {
    throw new Error(error)
  }
})

// Delete a blog category
const deleteBCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  console.log(id)

  try {
    const deleteBCategory = await BCategory.findByIdAndDelete(id)
    res.json(deleteBCategory)
  } catch (error) {
    throw new Error(error)
  }
})


module.exports = {
  createBCategory,
  getBCategory,
  getAllBCategory,
  updateBCategory,
  deleteBCategory
}