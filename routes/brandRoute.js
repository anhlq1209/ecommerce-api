const express = require('express')
const {
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
  getAllBrand
} = require('../controllers/brandController')
const router = express.Router()


router.post('/', createBrand)
router.put('/:id', updateBrand)
router.delete('/:id', deleteBrand)
router.get('/:id', getBrand)
router.get('/', getAllBrand)


module.exports = router