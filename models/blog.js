const { text } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema - describe the document
//model - provide an interface to the database based on the schema
// MongoDB: Databses contains collections which contain documents

//create a blog schema, timestamps auto adds a timestamp to each object created
const blogSchema = new Schema({
    title: { type: String, required: true },
    snippet: { type: String, required: true },
    body: { type: String, required: true }
}, { timestamps: true });

const Blog = mongoose.model('testcoll', blogSchema);

module.exports = Blog;