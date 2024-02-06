import React from 'react';
import './BlogViewer.css'; 

const BlogViewer = ({ blog }) => {
  console.log(blog)
  return (
    <div className="blog-container">
      <div className="blog-header">
        <p>blogger: <span>{blog.createdByEmail}</span></p>
      </div>
      <div className="blog-content">
        <p>{blog.content}</p>
      </div>
      <div className="blog-footer">
        <p>Published on: {blog.timeStamp}</p>
        <div className="blog-tags"> 
          {blog.tags.map((tag, index) => (
            <span key={index} className="blog-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogViewer;
