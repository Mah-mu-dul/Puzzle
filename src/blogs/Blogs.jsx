import React from "react";
import blogImage from "./stickcalculator/stick calculator 2.png"; // Assuming this is the path to the image

const Blogs = () => {
  const blogPosts = [
    {
      title: "Stick Length Calculator",
      content:
        "Discover our new Stick Length Calculator, a powerful tool designed to optimize material usage in your projects. " +
        "It helps you determine the minimum number of sticks required while minimizing waste. " +
        "Check it out for more details!",
      date: "2023-10-15",
      link: "/blog/stick-calculator",
      image: blogImage, // Added image property to the blog post object
    },
  
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Blogs</h1>
      {blogPosts.map((post, index) => (
        <div
          key={index}
          className="mb-6 p-4 max-w-72 w-full border rounded-lg shadow-md bg-white"
        >
          {post.link && (
            <a href={post.link} className="text-teal-600 underline">
              <img src={post.image} alt="Blog Image" className="mb-4 w-full" />{" "}
            </a>
          )}
          {/* Added image to the blog post */}
          <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
          <p className="text-gray-600 text-sm mb-2">{post.date}</p>
          <p className="text-gray-700">{post.content}</p>
          {post.link && (
            <a href={post.link} className="text-teal-600 underline">
              Read more
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default Blogs;
