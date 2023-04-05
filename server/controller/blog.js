const express = require('express')
const Blog = require('../models/blog')
const router = new express.Router()

exports.addBlog = async (req, res) => {
    try {

        const blog = new Blog(req.body) 
        const data = await blog.save()
        res.status(201).send(data)
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.getBlogs = async (req, res) => {
    try {
       const blogs =  await Blog.find('blogs')
        res.send(blogs)
    } catch (e) {
        console.log(e.message);
        res.status(500).send()
    }
}


exports.getBlogById = async (req, res) => {
    const _id = req.params.id

    try {
        const blog = await Blog.findOne({ _id})
        if (!blog) {
            return res.status(404).send()
        }
        res.send(blog)
    } catch (e) {
        res.status(500).send()
    }
}


exports.showBlog = async (req, res) => {
    try {
        const blogs = await Blog.find({})
        res.send(blogs)
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
}

exports.updateBlog = async (req, res) => {

    try {
        const blog = await Blog.findByIdAndUpdate( req.params.id , req.body)
        await blog.save()
        res.status(200).send(blog)
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.deleteBlog =  async (req, res) => {
    try {
        console.log(req.params.id);
        const blog = await Blog.findByIdAndDelete(req.params.id)

        if (!blog) {
            res.status(404).send()
        }
        res.send(blog)
    } catch (e) {
        res.status(500).send()
    }   
}