const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

mongoose
    .connect("mongodb://localhost:27017/WebDB")
    .then((err) => {
        console.log("Connected to the database");
    });

const BlogSchema = new mongoose.Schema({
    
});

const Blog = mongoose.model("Blog", BlogSchema, "");
