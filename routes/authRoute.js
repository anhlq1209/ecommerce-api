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
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
} = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

// POST
router.post("/forgot-password-token", forgotPasswordToken);
router.post("/register", createUser);
router.post("/login", loginUserController);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);

// PUT
router.put("/edit-user", authMiddleware, updateUser);
router.put("/password", authMiddleware, updatePassword);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/reset-password/:token", resetPassword);
router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

// DELETE
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/:id", deleteUser);

// GET
router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutUserController);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getOrders);
router.get("/get-orders", authMiddleware, getUserCart);
router.get("/:id", authMiddleware, isAdmin, getUserById);
router.get("/", getAllUser);

module.exports = router;
