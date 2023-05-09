const express = require("express");
const {
  createUser,
  loginUserController,
  loginAdmin,
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
  resetPassword,
  getWishlist,
  saveAddress,
  userCart,
} = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/forgot-password-token", forgotPasswordToken);
router.post("/register", createUser);
router.post("/login", loginUserController);
router.post("/admin-login", loginAdmin);
router.post("/cart", userCart);

router.put("/edit-user", authMiddleware, updateUser);
router.put("/password", authMiddleware, updatePassword);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/reset-password/:token", resetPassword);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

router.delete("/:id", deleteUser);

router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutUserController);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/:id", authMiddleware, isAdmin, getUserById);
router.get("/", getAllUser);

module.exports = router;
