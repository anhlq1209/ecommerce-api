const PCategory = require('../models/productCategoryModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodbId')


// Create product category
const createPCategory = asyncHandler(async (req, res) => {
  try {
    const newPCategory = await PCategory.create(req.body)
    res.json(newPCategory)
  } catch (error) {
    throw new Error(error)
  }
})

// Get a product category
const getPCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)

  try {
    const getPCategory = await PCategory.findById(id)
    res.json(getPCategory)
  } catch (error) {
    throw new Error(error)
  }
})

// Get all product category
const getAllPCategory = asyncHandler(async (req, res) => {
  try {
    const getAllPCategory = await PCategory.find()
    res.json(getAllPCategory)
  } catch (error) {
    throw new Error(error)
  }
})

// Update a product category
const updatePCategory = asyncHandler(async (req, res) => {
  const {id} = req.params
  validateMongoDbId(id)

  try {
    const updatePCategory = await PCategory.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })
    res.json(updatePCategory)
  } catch (error) {
    throw new Error(error)
  }
})

// Delete a product category
const deletePCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  console.log(id)

  try {
    const deletePCategory = await PCategory.findByIdAndDelete(id)
    res.json(deletePCategory)
  } catch (error) {
    throw new Error(error)
  }
})


module.exports = {
  createPCategory,
  getPCategory,
  getAllPCategory,
  updatePCategory,
  deletePCategory
}