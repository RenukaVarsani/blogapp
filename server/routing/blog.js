const express = require('express')
const Blog = require('../models/blog')
const router = express.Router()
const auth = require('../middleware/auth')
const BlogController = require('../controller/blog')


router.get('/myblogs', BlogController.showBlog); 

router.get("/" , BlogController.getBlogs);

router.post("/", auth, BlogController.addBlog);

router.get("/:id", auth, BlogController.getBlogById);

router.put("/:id", auth, BlogController.updateBlog);

router.delete("/:id", BlogController.deleteBlog);


module.exports = router;