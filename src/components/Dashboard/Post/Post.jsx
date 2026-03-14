import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { deletePost } from "../../../utils/deletePost";
import { Comments } from "../Comments/Comments";

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
    const deleted = await deletePost(postId);
    if (deleted) navigate("/");
    else alert("Failed to delete post.");
  }

  return (
    <article>
      <h3>{post.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <button onClick={handleDelete}>Delete</button>
      <Comments postId={post.id} />
    </article>
  );
}
