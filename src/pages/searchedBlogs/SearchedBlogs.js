// SearchedBlogs.js

import React, { useEffect, useState } from 'react';
import './SearchedBlogs.css';
import { useLocation } from 'react-router-dom';
import BlogViewer from '../../components/blogViewer/BlogViewer';

function SearchedBlogs() {
  const [searchedBlogs, setSearchedBlogs] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const receivedBlogs = location.state;
    setSearchedBlogs(receivedBlogs);
  }, [location.state]);

  return (
    <div className="searched-blogs-container">
      {searchedBlogs.length > 0 ? (
        <div className="blogs-container">
          {searchedBlogs.map((blog) => (
            <div key={blog.id} className="blog-wrapper">
              <BlogViewer blog={blog} />
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
}

export default SearchedBlogs;
