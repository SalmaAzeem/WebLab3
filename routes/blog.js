const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

mongoose
    .connect("mongodb://localhost:27017/WebDB")
    .then((err) => {
        console.log("Connected to the database");
    });

const BlogSchema = new mongoose.Schema({
    id: Number,
    title: String,
    content: String,
    author_id: Number
});

const Blog = mongoose.model("Blog", BlogSchema, "Blogs");

// fetch all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
        console.log(blogs);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

// fetch blog by id
router.get('/:id', async (req, res) => {
    try {
        let id = Number(req.params.id)
        const blog = await Blog.find({id});
        if (!blog) {
            return res.status(404).json({message: "Blog not found"});
        }
        res.json(blog);
        console.log(blog);

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});


// create blog
router.post('/', (req, res) => {
    const blog = new Blog({
        id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        author_id: req.body.author_id
    });

    blog.save()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
});


// update blog
router.put('/:id', async (req, res) => {
    try {
        let id = Number(req.params.id)
        const blog = await Blog.findOneAndUpdate({id}, req.body, {new: true});
        if (!blog) {
            return res.status(404).json({message: "Blog not found"});
        }
        res.json(blog);
        console.log(blog);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

// delete blog
router.delete('/:id', async (req, res) => {
    try {
        let id = Number(req.params.id)
        const blog = await Blog.findOneAndDelete({id});
        if (!blog) {
            return res.status(404).json({message: "Blog not found"});
        }
        res.json(blog);
        console.log(blog);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;