export async function togglePublish(post, setPosts, removeFromList) {
  try {
    // Updating the backend
    const response = await fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ published: !post.published }),
    });

    if (!response.ok) throw new Error("Failed to update post");

    // Updating the frontend
    if (!removeFromList)
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === post.id ? { ...p, published: !p.published } : p,
        ),
      );
    else setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
  } catch (error) {
    console.error("Toggle publish failed : ", error);
  }
}
