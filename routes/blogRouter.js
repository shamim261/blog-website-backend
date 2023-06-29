// internal imports
const express = require("express");

// external imports
const {
  getAllBlog,
  getSingleBlog,
  addBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");
const checkLogin = require("../middlewares/common/checkLogin");
const {
  addBlogValidator,
  addBlogValidatorHandler,
} = require("../middlewares/blog/addBlogValidator");
const {
  updateBlogValidator,
  updateBlogValidatorHandler,
} = require("../middlewares/blog/updateBlogValidator");

const router = express.Router();

// get all blog
router.get("/", checkLogin, getAllBlog);

// get single blog
router.get("/:id", checkLogin, getSingleBlog);

// post a blog
router.post(
  "/add",
  checkLogin,
  addBlogValidator,
  addBlogValidatorHandler,
  addBlog
);

// Update a blog
router.put(
  "/update/:id",
  checkLogin,
  updateBlogValidator,
  updateBlogValidatorHandler,
  updateBlog
);

// delete blog
router.delete("/delete/:id", checkLogin, deleteBlog);

// exports
module.exports = router;
