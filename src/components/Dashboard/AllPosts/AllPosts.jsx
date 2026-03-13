import { useState, useEffect } from "react";

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
    console.log(localStorage.getItem("token"));
    fetchAllPosts();
  }, []);

  return (
    <>
      <h1>All Posts</h1>
      {posts.map((post) => (
        <div>{post.title}</div>
      ))}
    </>
  );
}
