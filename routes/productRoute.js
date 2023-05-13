const express = require("express");
const {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages,
} = require("../controllers/productController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImage");
const router = express.Router();

// POST
router.post("/", authMiddleware, isAdmin, createProduct);

// PUT
router.put("/rating", authMiddleware, rating);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);
router.put("/:id", authMiddleware, isAdmin, updateProduct);

// DELETE
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

// GET
router.get("/:id", getProduct);
router.get("/", getAllProduct);

module.exports = router;
