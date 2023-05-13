const express = require("express");
const {
  createEnquiry,
  getEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getAllEnquiry,
} = require("../controllers/enquiryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

//POST
router.post("/", createEnquiry);

// PUT
router.put("/:id", authMiddleware, isAdmin, updateEnquiry);

// DELETE
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);

// GET
router.get("/:id", getEnquiry);
router.get("/", getAllEnquiry);

module.exports = router;
