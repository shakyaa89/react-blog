import axios from "axios";
import React, { useState } from "react";

const AddPost = () => {
  const [isFormShown, setFormShown] = useState(false);
  const [title, setTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("You must be logged in to add post!");
      return;
    }

    const user = JSON.parse(storedUser);

    const blogData = {
      title,
      blogBody,
      uploadedBy: user.name,
    };

    try {
      await axios.post("http://localhost:3000/blog", blogData);
      alert("Blog submitted successfully!");
      window.dispatchEvent(new Event("blog-added"));

      setTitle("");
      setBlogBody("");
      setFormShown(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <button
        type="button"
        className="w-50 mt-10 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer"
        onClick={() => setFormShown(!isFormShown)}
      >
        Add Post
      </button>

      {isFormShown && (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            Add Post
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-2 border rounded-md"
            />

            <textarea
              placeholder="Content"
              value={blogBody}
              onChange={(e) => {
                setBlogBody(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-2 border rounded-md resize-y min-h-[100px]"
            />

            {error && (
              <p className="font-bold text-red-500 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer"
            >
              Add
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddPost;
