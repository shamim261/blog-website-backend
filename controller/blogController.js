// internal imports

// external mports
const User = require("../models/People");
const Blog = require("../models/Blog");

// Get all blog

async function getAllBlog(req, res, next) {
  try {
    let blogs = await Blog.find();
    if (blogs) {
      res.status(200).json({
        blogs,
      });
    } else {
      res.status(200).json({
        msg: "No blog found!",
      });
    }
  } catch (e) {
    res.status(500).json({
      msg: "Server Problem!",
    });
  }
}

// get a  single blog
async function getSingleBlog(req, res, next) {
  let blog;
  try {
    blog = await Blog.findOne({ _id: req.params.id });
    if (blog) {
      res.status(200).json({
        blog,
      });
    } else {
      res.status(500).json({
        msg: "Couldn`t find any blog!",
      });
    }
  } catch (e) {
    res.status(500).json({
      msg: "Server problem!",
    });
  }
}

// post a blog

async function addBlog(req, res, next) {
  let blogObject;

  const { title, description, image } = req.body;

  blogObject = new Blog({
    title,
    description,
    image,
    user: req.user.username,
  });
  try {
    let result = await blogObject.save();
    if (result) {
      res.status(200).json({
        msg: "Blog added successfully!",
      });
    } else {
      res.status(500).json({
        msg: "Failed to add blog!",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "Server Problm!",
    });
  }
}

// update a  blog

async function updateBlog(req, res, next) {
  const loggedInUser = req.user.username;

  let user = await User.findOne({ username: loggedInUser });
  if (user && user.username === loggedInUser) {
    const { title, description } = req.body;

    try {
      let blog = await Blog.findByIdAndUpdate(req.params.id, {
        title,
        description,
      });
      if (blog) {
        res.status(200).json({
          msg: "Blog updated successfully!",
        });
      } else {
        res.status(500).json({
          msg: "Cannot update blog!",
        });
      }
    } catch (err) {
      res.status(500).json({
        msg: "Server problem!",
      });
    }
  } else {
    res.status(401).json({
      msg: "You are not allowed to upfate this blog!",
    });
  }
}

// delete blog
async function deleteBlog(req, res, next) {
  try {
    let blog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({
      msg: "Blog deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Cannot delete user!",
    });
  }
}

module.exports = { getAllBlog, getSingleBlog, addBlog, updateBlog, deleteBlog };
