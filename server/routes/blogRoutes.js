const express = require("express");
const router = express.Router();
const {
  saveDraft,
  publish,
  getAllBlogs,
} = require("../controllers/blogController");

router.post("/save-draft", saveDraft);
router.post("/publish", publish);
router.get("/get-all", getAllBlogs);

module.exports = router;
