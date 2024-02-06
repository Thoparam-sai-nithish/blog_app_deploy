import React ,{useEffect, useState} from 'react'
import BlogViewer from '../../components/blogViewer/BlogViewer'
import './MyBlogs.css'
import axios from 'axios'


function MyBlogs() {
  const [allBlogs, setAllBlogs] = useState([])
  //fetch all blogs
  useEffect(()=>{
    axios.post('http://localhost:3500/blogs/allBlogs',{})
    .then((res)=>{
      const userEmail = localStorage.getItem('email');
      const filteredBlogs = res.data.payload.filter(blog => blog.createdByEmail === userEmail);
      const reversedBlogs = filteredBlogs.reverse();
      setAllBlogs(reversedBlogs)
      console.log(reversedBlogs)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
  return (
    <div className="home-container">
    {allBlogs.length > 0 ? (
      <div className="blogs-container">
        {allBlogs.map((blog) => (
          <div key={blog.id} className="blog-wrapper">
            <BlogViewer blog={blog} />
          </div>
        ))}
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  )
}

export default MyBlogs