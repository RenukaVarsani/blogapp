const express = require('express')
const Blog = require('../models/blog')
const router = express.Router()
const auth = require('../middleware/auth')
const BlogController = require('../controller/blog')


router.get("/blogs" , BlogController.getBlogs);

router.post("/blogs", auth, BlogController.addBlog);

router.get("/blogs/:id", auth, BlogController.getBlogById);

router.put("blogs/:id", auth, BlogController.updateBlog);

router.delete("blogs/:id", auth, BlogController.deleteBlog);

router.get('/myblogs', BlogController.showBlog);

module.exports = router;