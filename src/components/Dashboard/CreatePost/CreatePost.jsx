import { useState } from "react";
import ReactQuill from "react-quill";
// This import is required for the editor UI to appear correctly
import "react-quill/dist/quill.snow.css";

export function CreatePost() {
  const [content, setContent] = useState("");

  return <ReactQuill theme="snow" value={content} onChange={setContent} />;
}
