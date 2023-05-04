const express = require('express')
const {
  authMiddleware,
  isAdmin
} = require('../middlewares/authMiddleware')
const {
  createBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  disLikeBlog
} = require('../controllers/blogController')
const router = express.Router()


router.post('/', authMiddleware, isAdmin, createBlog)
router.put('/likes', authMiddleware, isAdmin, likeBlog)
router.put('/dislikes', authMiddleware, isAdmin, disLikeBlog)
router.put('/:id', authMiddleware, isAdmin, createBlog)
router.delete('/:id', authMiddleware, isAdmin, deleteBlog)
router.get('/:id', getBlog)
router.get('/', getAllBlog)


module.exports = router