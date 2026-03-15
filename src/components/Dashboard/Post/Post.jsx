import styles from "./Post.module.css";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { deletePost } from "../../../utils/deletePost";
import { Comments } from "../Comments/Comments";
import edit from "../../../assets/icons/create.svg";
import bin from "../../../assets/icons/bin.svg";

export function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`);
        if (!response.ok) throw new Error("Couldn't fetch the post");
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPost();
  }, [postId]);

  if (!post) return <h1>Post not found! 404</h1>;

  async function handleDelete() {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post? This action cannot be undone.",
    );
    if (isConfirmed) {
      const deleted = await deletePost(postId);
      if (deleted) navigate("/");
      else alert("Failed to delete post.");
    }
  }

  return (
    <div className={styles.postPageMain}>
      <article className={styles.post}>
        {post.image && (
          <div className={styles.image}>
            <img src={post.image} alt={post.title} />
          </div>
        )}
        <h1 className={styles.title}>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{ __html: post.content }}
          className={styles.content}
        />
        <div className={styles.buttons}>
          <button
            onClick={() => navigate(`/posts/${post.id}/edit`)}
            className={styles.edit}
          >
            Edit <img src={edit} className={styles.editIcon} />
          </button>
          <button onClick={handleDelete} className={styles.delete}>
            Delete <img src={bin} className={styles.bin} />
          </button>
        </div>
      </article>
      <Comments postId={post.id} />
    </div>
  );
}
