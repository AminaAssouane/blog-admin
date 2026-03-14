export async function deletePost(postId) {
  try {
    const response = await fetch(`http://localhost:3000/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) throw new Error("Could not delete the post");
    return true;
  } catch (error) {
    console.error("Could not delete the post : ", error);
    return false;
  }
}
