import { useState, useEffect } from "react";
import { togglePublish } from "../../../utils/useTogglePublish";

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
      <h1>Published Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <div>{post.title}</div>
          <button onClick={() => togglePublish(post, setPosts)}>
            {post.published ? "Unpublish" : "Publish"}
          </button>
        </div>
      ))}
    </>
  );
}
