import React ,{useEffect, useState} from 'react'
import BlogViewer from '../../components/blogViewer/BlogViewer'
import './Home.css'
import axios from 'axios'


function Home() {
  const [allBlogs, setAllBlogs] = useState([])
  //fetch all blogs
  useEffect(()=>{
    axios.post('https://blogapp-aapi.onrender.com/blogs/allBlogs',{})
    .then((res)=>{
        const allBlogs = res.data.payload
        const reversedBlogs = allBlogs.reverse();
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

export default Home