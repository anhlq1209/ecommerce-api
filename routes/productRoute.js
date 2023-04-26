const express = require('express')
const {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController')
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware')
const router = express.Router()


router.post('/', authMiddleware, isAdmin, createProduct)
router.get('/:id', getProduct)
router.delete('/:id', authMiddleware, isAdmin, deleteProduct)
router.put('/:id', authMiddleware, isAdmin, updateProduct)
router.get('/', getAllProduct)


module.exports = router