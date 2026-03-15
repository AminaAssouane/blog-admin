import { useState, useEffect } from "react";
import { togglePublish } from "../../../utils/togglePublish";
import { Link } from "react-router";
import styles from "./AllPosts.module.css";

export function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const response = await fetch("http://localhost:3000/posts/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw Error(`Error ${response.status}`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts : ", error);
      }
    }
    fetchAllPosts();
  }, []);

  return (
    <>
      <h1 className={styles.header}>All Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className={styles.post}>
          <div className={styles.title}>{post.title}</div>
          <div className={styles.buttons}>
            <button onClick={() => togglePublish(post, setPosts, false)}>
              {post.published ? "Unpublish" : "Publish"}
            </button>
            <Link to={`posts/${post.id}`}>
              <button>Details →</button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
