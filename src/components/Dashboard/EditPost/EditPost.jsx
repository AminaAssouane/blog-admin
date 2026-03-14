import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export function EditPost({ post }) {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <h1>Editing post!</h1>
    </>
  );
}
