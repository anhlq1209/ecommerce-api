const express = require("express");
const {
  createPCategory,
  getPCategory,
  updatePCategory,
  deletePCategory,
  getAllPCategory,
} = require("../controllers/productCategoryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

// POST
router.post("/", authMiddleware, isAdmin, createPCategory);

// PUT
router.put("/:id", authMiddleware, isAdmin, updatePCategory);

// DELETE
router.delete("/:id", authMiddleware, isAdmin, deletePCategory);

// GET
router.get("/:id", getPCategory);
router.get("/", getAllPCategory);

module.exports = router;
