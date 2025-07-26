import React, { useEffect, useState } from "react";
import axios from "axios";

interface Blog {
  _id: string;
  title: string;
  blogBody: string;
  uploadedBy: string;
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/blog");
      setBlogs(response.data);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();

    const handleRefresh = () => {
      fetchBlogs();
    };

    window.addEventListener("blog-added", handleRefresh);

    return () => {
      window.removeEventListener("blog-added", handleRefresh);
    };
  }, []);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  const handleDelete = (blogId: any) => {
    try {
      axios.delete(`http://localhost:3000/blog/${blogId}`);
      alert("Blog Deleted Successfully!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      {error && <p>{error}</p>}
      {blogs.length === 0 && <p>No blogs found.</p>}

      {blogs.map((blog) => (
        <div key={blog._id} className="mb-6 p-4 border rounded-md shadow-sm">
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <p className="mt-2 whitespace-pre-line">{blog.blogBody}</p>
          <p className="mt-4 text-sm text-gray-600">By: {blog.uploadedBy}</p>
          <button
            className="py-2 px-3 bg-red-500 text-white rounded-xl mt-2 cursor-pointer "
            onClick={() => handleDelete(blog._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
