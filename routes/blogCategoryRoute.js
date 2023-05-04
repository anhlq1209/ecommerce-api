const express = require('express')
const {
  createBCategory,
  getBCategory,
  updateBCategory,
  deleteBCategory,
  getAllBCategory
} = require('../controllers/blogCategoryController')
const router = express.Router()


router.post('/', createBCategory)
router.put('/:id', updateBCategory)
router.delete('/:id', deleteBCategory)
router.get('/:id', getBCategory)
router.get('/', getAllBCategory)


module.exports = router