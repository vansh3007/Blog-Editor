import React from "react";
import BlogEditor from "./components/BlogEditor";
import { v4 as uuidv4 } from "uuid";

function App() {
  return (
    <div className="App">
      <h1 style={{ color: "#ef6f1e", textAlign: "center" }}>Blog Editor</h1>
      <BlogEditor BlogEditorId={uuidv4()} />
    </div>
  );
}

export default App;
