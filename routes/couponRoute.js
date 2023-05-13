const express = require("express");
const router = express.Router();
const {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCoupon,
  getAllCoupons,
} = require("../controllers/couponController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

// POST
router.post("/", authMiddleware, isAdmin, createCoupon);

// PUT
router.put("/:id", authMiddleware, isAdmin, updateCoupon);

// DELETE
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);

// GET
router.get("/:id", getCoupon);
router.get("/", getAllCoupons);

module.exports = router;
