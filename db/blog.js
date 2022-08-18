const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  desc: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: new Date()
  },
  markdown: {
    type: String,
    require: true
  },
  slug: {
    type: String,
    require: true,
    unique: true
  },
  sanitizeHtml: {
    type: String,
    require: true
  }
});

const Blog = mongoose.model('Blog', blogsSchema);

module.exports = Blog;