import { useState, useEffect } from "react";

export function UnpublishedPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchUnpublishedPosts() {
      try {
        const response = await fetch(
          "http://localhost:3000/posts/unpublished",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) throw Error(`Error ${response.status}`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch unpublished posts : ", error);
      }
    }
    fetchUnpublishedPosts();
  }, []);

  return (
    <>
      <h1>Unpublished Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </>
  );
}
