import styles from "./PublishedPosts.module.css";
import { useState, useEffect } from "react";
import { togglePublish } from "../../../utils/togglePublish";
import { Link } from "react-router";

export function PublishedPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPublishedPosts() {
      try {
        const response = await fetch("http://localhost:3000/posts/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw Error(`Error ${response.status}`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch published posts : ", error);
      }
    }
    fetchPublishedPosts();
  }, []);

  return (
    <>
      <h1 className={styles.header}>Published Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className={styles.post}>
          <div className={styles.title}>{post.title}</div>
          <div className={styles.buttons}>
            <button onClick={() => togglePublish(post, setPosts, true)}>
              Unpublish
            </button>
            <Link to={`/posts/${post.id}`}>
              <button>Details →</button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
