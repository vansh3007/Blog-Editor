import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./BlogEditor.css";

const BlogEditor = ({ BlogEditorId }) => {
  const [blogId, setBlogId] = useState(BlogEditorId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [draftBlogs, setDraftBlogs] = useState([]);
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const [isAutoSaveActive, setIsAutoSaveActive] = useState(true);

  const saveDraft = async () => {
    if (!title.trim() && !content.trim()) return;
    try {
      await axios.post(
        "https://blog-editor-18gs.onrender.com/api/blogs/save-draft",
        {
          id: blogId,
          title,
          content,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }
      );
      fetchPublished();
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (err) {
      console.error("Error saving draft:", err);
    }
  };

  const fetchPublished = async () => {
    try {
      const res = await axios.get(
        "https://blog-editor-18gs.onrender.com/api/blogs/get-all"
      );
      const published = res.data.published.filter(
        (blog) => blog.status === "published"
      );
      setPublishedBlogs(published);
      const drafts = res.data.drafts.filter((blog) => blog.status === "draft");
      setDraftBlogs(drafts);
    } catch (err) {
      console.error("Error fetching published blogs:", err);
    }
  };

  useEffect(() => {
    fetchPublished();
  }, []);

  // Auto-save every 30s
  useEffect(() => {
    if (!isAutoSaveActive) return;
    const interval = setInterval(saveDraft, 30000);
    return () => clearInterval(interval);
  }, [isAutoSaveActive]);

  // Debounced save on content change
  useEffect(() => {
    if (!isAutoSaveActive) return;
    const debounce = setTimeout(saveDraft, 5000);
    return () => clearTimeout(debounce);
  }, [title, content, tags]);

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }
    try {
      await axios.post(
        "https://blog-editor-18gs.onrender.com/api/blogs/publish",
        {
          id: blogId,
          title,
          content,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }
      );
      alert("Blog published!");
      setContent("");
      setTitle("");
      setTags("");
      setIsAutoSaveActive(false);
      setBlogId(uuidv4()); // Reset ID for next blog
      fetchPublished();
    } catch (err) {
      console.error("Error publishing blog:", err);
    }
  };

  const handleEditDraft = (blog) => {
    // Optional: Ask for confirmation before replacing current blog
    // if (!window.confirm("Do you want to edit this draft? Unsaved changes will be lost.")) return;
    setTitle(blog.title);
    setContent(blog.content);
    setTags(blog.tags.join(", "));
    setBlogId(blog.id || blog.Blogid); // Handle inconsistent naming
    setIsAutoSaveActive(true);
  };

  const handleNewDraft = () => {
    saveDraft();
    setBlogId(uuidv4());
    setTitle("");
    setContent("");
    setTags("");
    setIsAutoSaveActive(true);
  };

  return (
    <div className="main-container">
      <div className="blog-editor-container">
        <h2 className="editor-heading">Write a Blog</h2>

        <label className="editor-label">Title</label>
        <input
          type="text"
          className="editor-input"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
        />

        <label className="editor-label">Content</label>
        <textarea
          rows="8"
          className="editor-textarea"
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <label className="editor-label">Tags (comma separated)</label>
        <input
          type="text"
          className="editor-input"
          placeholder="e.g., tech, react, tutorial"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          maxLength={100}
        />

        <div className="editor-buttons">
          <button className="btn btn-draft" onClick={handleNewDraft}>
            Save as Draft
          </button>

          <button
            className="btn btn-publish"
            onClick={handlePublish}
            disabled={!title.trim() || !content.trim()}
          >
            Publish
          </button>
          {isSaved && <span className="saved-status">Auto-saved</span>}
        </div>
      </div>

      <div className="blog-preview-container">
        <h3>Published Blogs</h3>
        {publishedBlogs.length === 0 ? (
          <p>No blogs published yet.</p>
        ) : (
          <ul className="blog-list">
            {publishedBlogs.map((blog) => (
              <li key={blog.id || blog.Blogid} className="blog-card">
                <h4>{blog.title}</h4>
                <p>{blog.content.substring(0, 100)}...</p>
                <div className="tag-container">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}

        <h3>Draft Blogs</h3>
        {draftBlogs.length === 0 ? (
          <p>No blogs drafted yet.</p>
        ) : (
          <ul className="blog-list">
            {draftBlogs.map((blog) => (
              <li key={blog.id || blog.Blogid} className="blog-card">
                <h4>{blog.title}</h4>
                <p>{blog.content.substring(0, 100)}...</p>
                <div className="tag-container">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  className="btn btn-edit"
                  style={{ marginTop: "10px" }}
                  onClick={() => {
                    handleEditDraft(blog);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BlogEditor;
