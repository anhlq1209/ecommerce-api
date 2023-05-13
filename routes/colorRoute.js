const express = require("express");
const {
  createColor,
  getColor,
  updateColor,
  deleteColor,
  getAllColor,
} = require("../controllers/colorController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

// POST
router.post("/", authMiddleware, isAdmin, createColor);

// PUT
router.put("/:id", authMiddleware, isAdmin, updateColor);

// DELETE
router.delete("/:id", authMiddleware, isAdmin, deleteColor);

// GET
router.get("/", getAllColor);

module.exports = router;
