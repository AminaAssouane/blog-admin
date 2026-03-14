export async function deleteComment(postId, commentId) {
  try {
    const response = await fetch(
      `http://localhost:3000/posts/${postId}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (!response.ok) throw new Error("Failed to delete comment.");
    return true;
  } catch (error) {
    console.error("Failed to delete comment : ", error);
    return false;
  }
}
