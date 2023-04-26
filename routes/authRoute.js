const express = require('express')
const {
  createUser,
  loginUserController,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logoutUserController,
  updatePassword,
  forgotPasswordToken,
  resetPassword
} = require('../controllers/userController')
const {
  authMiddleware,
  isAdmin
} = require('../middlewares/authMiddleware')
const router = express.Router()


router.post('/register', createUser)
router.post('/forgot-password-token', forgotPasswordToken)
router.put('/reset-password/:token', resetPassword)

router.put('/password', authMiddleware, updatePassword)
router.post('/login', loginUserController)
router.get('/all-users', getAllUser)
router.get('/refresh', handleRefreshToken)
router.get('/logout', logoutUserController)
router.get('/:id', authMiddleware, isAdmin, getUserById)
router.delete('/:id', deleteUser)
router.put('/edit-user', authMiddleware, updateUser)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)


module.exports = router