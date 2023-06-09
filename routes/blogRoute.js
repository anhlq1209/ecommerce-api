const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  createBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  disLikeBlog,
  uploadImages,
} = require("../controllers/blogController");
const { blogImgResize, uploadPhoto } = require("../middlewares/uploadImage");
const router = express.Router();

// POST
router.post("/", authMiddleware, isAdmin, createBlog);

// PUT
router.put("/likes", authMiddleware, isAdmin, likeBlog);
router.put("/dislikes", authMiddleware, isAdmin, disLikeBlog);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  blogImgResize,
  uploadImages
);
router.put("/:id", authMiddleware, isAdmin, createBlog);

// DELETE
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

// GET
router.get("/:id", getBlog);
router.get("/", getAllBlog);

module.exports = router;
