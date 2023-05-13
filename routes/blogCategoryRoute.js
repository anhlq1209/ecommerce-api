const express = require('express')
const {
  createBCategory,
  getBCategory,
  updateBCategory,
  deleteBCategory,
  getAllBCategory
} = require('../controllers/blogCategoryController')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()

// POST
router.post('/', authMiddleware, isAdmin, createBCategory)

// PUT
router.put('/:id', authMiddleware, isAdmin, updateBCategory)

// DELETE
router.delete('/:id', authMiddleware, isAdmin, deleteBCategory)

// GET
router.get('/:id', getBCategory)
router.get('/', getAllBCategory)


module.exports = router