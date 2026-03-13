import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";

import { Login } from "./components/Login/Login.jsx";
import { Dashboard } from "./components/Dashboard/Dashboard.jsx";
import { AllPosts } from "./components/Dashboard/AllPosts/AllPosts.jsx";
import { PublishedPosts } from "./components/Dashboard/PublishedPosts/PublishedPosts.jsx";
import { UnpublishedPosts } from "./components/Dashboard/UnpublishedPosts/UnpublishedPosts.jsx";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },

  {
    path: "/",
    element: <Dashboard />,
    children: [
      { index: true, element: <AllPosts /> },
      { path: "publishedposts", element: <PublishedPosts /> },
      { path: "unpublishedposts", element: <UnpublishedPosts /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App router={router} />
  </StrictMode>,
);
