import React from "react";
import AddPost from "../components/AddPost";
import BlogList from "../components/BlogsList";

const BlogPage = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <AddPost />
      <BlogList />
    </div>
  );
};

export default BlogPage;
