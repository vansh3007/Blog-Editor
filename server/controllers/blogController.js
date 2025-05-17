const Blog = require("../models/Blog");

exports.saveDraft = async (req, res) => {
  const { id, title, content, tags } = req.body;
  const data = {
    title,
    content,
    tags,
    status: "draft",
    updated_at: new Date(),
  };

  try {
    let blog = await Blog.findOneAndUpdate({ Blogid: id }, data, { new: true });
    if (!blog) {
      blog = await Blog.create({ Blogid: id, ...data, created_at: new Date() });
    }
    res.json(blog);
  } catch (err) {
    console.error("Error in saveDraft:", err);
    res.status(500).json({ message: "Failed to save draft" });
  }
};

exports.publish = async (req, res) => {
  const { id, title, content, tags } = req.body;
  const data = {
    title,
    content,
    tags,
    status: "published",
    updated_at: new Date(),
  };

  try {
    let blog = await Blog.findOneAndUpdate({ Blogid: id }, data, { new: true });
    if (!blog) {
      blog = await Blog.create({ Blogid: id, ...data, created_at: new Date() });
    }
    res.json(blog);
  } catch (err) {
    console.error("Error in publish:", err);
    res.status(500).json({ message: "Failed to publish blog" });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    const drafts = blogs.filter((b) => b.status === "draft");
    const published = blogs.filter((b) => b.status === "published");
    res.json({ drafts, published });
  } catch (err) {
    console.error("Error in getAllBlogs:", err);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};
