import { useState } from "react";
import { useNavigate } from "react-router";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import styles from "./CreatePost.module.css";

export function CreatePost() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write a new article!",
      }),
    ],
    content: "",
    immediatelyRender: false,
  });

  if (!editor) return null;

  async function handlePost() {
    const html = editor.getHTML();

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: title,
          content: html,
        }),
      });
      if (!response.ok) throw new Error("Failed to create post");
      const data = await response.json();
      console.log("Post created: ", data);

      // reset form
      setTitle("");
      editor.commands.setContent("");
      navigate("/");
    } catch (error) {
      console.error("Creating post failed : ", error);
    }
  }

  return (
    <>
      <h1>Title :</h1>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <h1>Content : </h1>
      <div className={styles.container}>
        <header className={styles.toolbar}>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`${styles.toolbarButton} ${editor.isActive("heading", { level: 1 }) ? styles.activeButton : ""}`}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${styles.toolbarButton} ${editor.isActive("bold") ? styles.activeButton : ""}`}
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${styles.toolbarButton} ${editor.isActive("italic") ? styles.activeButton : ""}`}
          >
            i
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${styles.toolbarButton} ${editor.isActive("bulletList") ? styles.activeButton : ""}`}
          >
            List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`${styles.toolbarButton} ${editor.isActive("blockquote") ? styles.activeButton : ""}`}
          >
            “ Quote
          </button>
        </header>

        <main>
          <EditorContent editor={editor} />
        </main>

        <footer className={styles.footer}>
          <button onClick={handlePost} className={styles.postButton}>
            Post
          </button>
        </footer>
      </div>
    </>
  );
}
