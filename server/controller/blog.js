const express = require('express')
const Blog = require('../models/blog')
const router = new express.Router()

exports.addBlog = async (req, res) => {

    const blog = new Blog({...req.body,owner:req.user._id}  )
    try {
        await blog.save()
        res.status(201).send(blog)
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.getBlogs = async (req, res) => {
    try {
        await req.user.populate('blogs')
        res.send(req.user.blogs)
    } catch (e) {
        console.log(e.message);
        res.status(500).send()
    }
}


exports.getBlogById = async (req, res) => {
    const _id = req.params.id

    try {
        const blog = await Blog.findOne({ _id, owner: req.user._id })
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

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'name']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const blog = await Blog.findOne({ _id: req.params.id, owner: req.user._id})

        updates.forEach((update) => blog[update] = req.body[update])
        await blog.save()

        if (!blog) {
            return res.status(404).send()
        }

        res.send(blog)
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.deleteBlog =  async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!blog) {
            res.status(404).send()
        }
        res.send(blog)
    } catch (e) {
        res.status(500).send()
    }   
}