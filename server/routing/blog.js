const express = require('express')
const Blog = require('../models/blog')
const router = express.Router()
const {upload} = require("../middleware/image")
const auth = require('../middleware/auth')
const BlogController = require('../controller/blog')


router.get('/myblogs' , BlogController.showBlog);

router.get("/" ,  BlogController.getBlogs);

router.post("/", upload.single('image'),BlogController.addBlog);

router.get("/select/:id" , BlogController.getBlogById);

router.patch("/:id",upload.single('image'),BlogController.updateBlog);

router.delete("/:id", BlogController.deleteBlog);


module.exports = router;