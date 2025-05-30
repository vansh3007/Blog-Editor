# Full-Stack Blog Editor
## Deployed Link
https://vansh-blog-editor.netlify.app/

A full-featured blog editor web application built with **React.js**, **Node.js (Express.js)**, and **MongoDB**, enabling users to:

- Create blog posts and edit draft blogs
- Save blog posts as drafts
- Auto-load draft data for editing
- Publish blog posts when ready

---

## Features

- **Rich Blog Editor** with support for title, content, and tags
- **Save as Draft** functionality to save work-in-progress blogs
- **Edit Existing Drafts** and republish or update them
- **View All Drafts** with an Edit button beside each
- **Publish Blog Posts** from scratch or from drafts
- **Auto-clear form** after saving or publishing a blog
- ⬆**Scroll to top** when editing a draft

---

## Tech Stack

### Frontend:
- React.js
- Axios for HTTP requests
- CSS for styling

### Backend:
- Node.js with Express.js
- MongoDB for database
- Mongoose for data modeling

---

### Folder Structure:
.
├── client
│   ├── src
│   │   ├── components
│   │   ├── App.js
│   │   └── ...
├── server
│   ├── models
│   ├── routes
│   ├── controllers
│   └── server.js


### Usage:
- Fill in the blog title, content, and tags.
- Click Save as Draft to store the blog as a draft.
- Click Edit on any draft to load its content back into the editor.
- Click Publish to post the blog.

### Future Enhancements:
- Rich text editor with markdown/HTML preview
- User authentication & personal draft storage
- Tags auto-complete & filtering
- Public blog listing with like/share functionality

### License:
This project is licensed under the MIT License. Feel free to fork and enhance!

### Author:
Developed by Vansh Shrivastava
