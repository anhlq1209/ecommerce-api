const Color = require('../models/colorModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodbId')


// Create Color
const createColor = asyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body)
    res.json(newColor)
  } catch (error) {
    throw new Error(error)
  }
})

// Get all Color
const getAllColor = asyncHandler(async (req, res) => {
  try {
    const getAllColor = await Color.find()
    res.json(getAllColor)
  } catch (error) {
    throw new Error(error)
  }
})

// Update a Color
const updateColor = asyncHandler(async (req, res) => {
  const {id} = req.params
  validateMongoDbId(id)

  try {
    const updateColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })
    res.json(updateColor)
  } catch (error) {
    throw new Error(error)
  }
})

// Delete a Color
const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)

  try {
    const deleteColor = await Color.findByIdAndDelete(id)
    res.json(deleteColor)
  } catch (error) {
    throw new Error(error)
  }
})


module.exports = {
  createColor,
  getAllColor,
  updateColor,
  deleteColor
}