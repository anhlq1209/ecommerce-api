const express = require("express");
const {
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
  getAllBrand,
} = require("../controllers/brandController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

//POST
router.post("/", authMiddleware, isAdmin, createBrand);

// PUT
router.put("/:id", authMiddleware, isAdmin, updateBrand);

// DELETE
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);

// GET
router.get("/:id", getBrand);
router.get("/", getAllBrand);

module.exports = router;
