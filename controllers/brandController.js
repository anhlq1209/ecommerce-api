const Brand = require('../models/brandModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodbId')


// Create brand
const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body)
    res.json(newBrand)
  } catch (error) {
    throw new Error(error)
  }
})

// Get a brand
const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)

  try {
    const getBrand = await Brand.findById(id)
    res.json(getBrand)
  } catch (error) {
    throw new Error(error)
  }
})

// Get all brand
const getAllBrand = asyncHandler(async (req, res) => {
  try {
    const getAllBrand = await Brand.find()
    res.json(getAllBrand)
  } catch (error) {
    throw new Error(error)
  }
})

// Update a brand
const updateBrand = asyncHandler(async (req, res) => {
  const {id} = req.params
  validateMongoDbId(id)

  try {
    const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })
    res.json(updateBrand)
  } catch (error) {
    throw new Error(error)
  }
})

// Delete a brand
const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)

  try {
    const deleteBrand = await Brand.findByIdAndDelete(id)
    res.json(deleteBrand)
  } catch (error) {
    throw new Error(error)
  }
})


module.exports = {
  createBrand,
  getBrand,
  getAllBrand,
  updateBrand,
  deleteBrand
}