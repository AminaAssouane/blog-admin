import styles from "./EditPost.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export function EditPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Edit your post!",
      }),
    ],
    immediatelyRender: false,
  });

  useEffect(() => {
    let isMounted = true; // Cleanup flag
    async function fetchPost() {
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`);
        if (!response.ok) throw new Error("Failed fetching post");
        const data = await response.json();
        if (isMounted) {
          setPost(data);
          setTitle(data.title);

          // ONLY set content if the editor is empty
          // This prevents overwriting my changes while I type
          if (editor && editor.isEmpty && data.content) {
            editor.commands.setContent(data.content);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchPost();
    return () => {
      isMounted = false;
    };
  }, [postId, editor]);

  if (!editor) return <h1>Error uploading the editor</h1>;
  if (!post) return <h1>Post not found!</h1>;

  async function handleEdit() {
    const html = editor.getHTML();
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: title,
          content: html,
        }),
      });
      if (!response.ok) throw new Error("Failed updating the post");
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <section className={styles.wrapper}>
        <h1 className={styles.header}>Edit post</h1>
        <h2>Title :</h2>
        <input
          type="text"
          name="title"
          className={styles.titleInput}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <h2>Content : </h2>
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
            <button onClick={handleEdit} className={styles.postButton}>
              Edit
            </button>
          </footer>
        </div>
      </section>
    </>
  );
}
