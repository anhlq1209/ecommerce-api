const express = require('express')
const {
  createPCategory,
  getPCategory,
  updatePCategory,
  deletePCategory,
  getAllPCategory
} = require('../controllers/productCategoryController')
const router = express.Router()


router.post('/', createPCategory)
router.put('/:id', updatePCategory)
router.delete('/:id', deletePCategory)
router.get('/:id', getPCategory)
router.get('/', getAllPCategory)


module.exports = router