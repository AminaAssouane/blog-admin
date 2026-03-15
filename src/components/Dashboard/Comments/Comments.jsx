import styles from "./Comments.module.css";
import { useEffect, useState } from "react";
import { deleteComment } from "../../../utils/deleteComment";
import bin from "../../../assets/icons/bin.svg";

export function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(
          `http://localhost:3000/posts/${postId}/comments`,
        );
        if (!response.ok) throw new Error("Failed to fetch comments");
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Failed to fetch comments : ", error);
      }
    }
    fetchComments();
  }, [postId]);

  async function handleDelete(commentId) {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this post? This action cannot be undone.",
      );
      if (isConfirmed) {
        await deleteComment(postId, commentId);
        setComments((prev) =>
          prev.filter((comment) => comment.id !== commentId),
        );
      }
    } catch (error) {
      alert("You are not authorized to delete this comment.", error);
    }
  }

  return (
    <>
      <h1>Comments : {comments.length}</h1>
      {comments.map((comment) => (
        <section key={comment.id}>
          <div>{comment.username}</div>
          <p>{comment.content}</p>
          <button
            onClick={() => handleDelete(comment.id)}
            className={styles.delete}
          >
            Delete <img src={bin} alt="bin" className={styles.bin} />
          </button>
        </section>
      ))}
    </>
  );
}
