import React, { useEffect, useState } from 'react'
import './NavigationBar.css'
import image from '../../images/appLogo.png'
import Offcanvas from '../../components/offcanvas/Offcanvas';
import { NavLink, useNavigate } from 'react-router-dom';
import { RiLoginBoxFill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { AiFillThunderbolt } from "react-icons/ai";
import { IoCloudOutline } from "react-icons/io5";
import { IoCloudSharp } from "react-icons/io5";
import { ImMenu } from "react-icons/im";
import { CiSearch } from "react-icons/ci";

import axios from 'axios';

function NavigationBar() {
  const [isUserLoggedin, setIsUserLoggedin] = useState(false)
  const [selectedTags, setSelectedTags] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  // Offcanvas
  const openOffcanvas = () => {
    setIsOpen(true);
  };

  const closeOffcanvas = () => {
    setIsOpen(false);
  };

  const handleSearch= ()=>{
    console.log(selectedTags)
    if(selectedTags.length > 0){
      axios.post('http://localhost:3500/blogs/allBlogs',{})
      .then((res)=>{
        const allBlogs = res.data.payload
        const filteredBlogs = allBlogs.filter((blog) =>
          selectedTags.every((tag) => blog.tags.includes(tag))
        );
        
        navigate('/searchedBlogs',{state:filteredBlogs })
      })
      .catch((err)=>{
        console.log("ERR: ",err)
      })
    }
  }

  const handleSelectChange = (event) => {
    const clickedValue = event.target.value;
    
    // Check if the clicked option is already selected
    if (selectedTags.includes(clickedValue)) {
      // If selected, remove it from the array
      const updatedOptions = selectedTags.filter((option) => option !== clickedValue && option!==',');
      setSelectedTags(updatedOptions);
    } else {
      // If not selected, add it to the array
      setSelectedTags([...selectedTags, clickedValue]);
    }
  };

  useEffect(()=>{
    const token = localStorage.getItem('token')
    axios.post('http://localhost:3500/accounts/verifyLoginToken',{token})
    .then((res)=>{ 
      setIsUserLoggedin(res.data.valid)
      localStorage.setItem('email',res.data.payload.email)
      if(!res.data.valid) {
        alert("Please login !");
        navigate('/')
      }
    })
    .catch((err)=>{
      alert("Please login again!");
      navigate('/');
    })
  },[localStorage.getItem('token')])

  return (
    <div className='NavigationBar'>
      <div className="grid-container">

        <div className="box box1" style={{
          cursor:"pointer"
        }} 
          onClick={()=>{navigate('/')}}
        >
          <img src={image} alt="" />
        </div>
          
                  <div className="box box3">
                    {
                      isUserLoggedin?
                      <NavLink to='/profile' style={{textDecoration:"none"}} className="profileBtn"><IoPersonSharp className='navIcon'/> </NavLink>
                      :
                      <NavLink to={'/login'}  style={{textDecoration:"none"}} className="loginBtn">Login</NavLink>
                    }
                  </div>
        
        {/* <div className="box box2">
          <input  type="search" name="search" value={selectedTags} id="search" placeholder='search tags'/>
          <div className="searchTags">
              <select
                id="multiSelect"
                multiple
                value={selectedTags}
                onChange={handleSelectChange}
                className='tags'
              >
                <option value="Sports">Sports</option>
                <option value="spirituality">spirituality</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Health">Health</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Education">Education</option>
                <option value="Politics">Politics</option>
                <option value="Current Affairs">Current Affairs</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <button style={{
              border:'none',
              backgroundColor:'transparent',
              height:'70%' ,
            }}
              onClick={()=>{handleSearch()}}
            ><CiSearch/></button>
        </div> */}

        {<div className="box box4 loginBox">
          <NavLink to={'/Home'} activeClassName="active" className="home menu-item">
            <IoHomeOutline className='icon1'/>
            <IoHomeSharp className='icon2'/>
            Home
          </NavLink>
          {isUserLoggedin&&<NavLink to={'/addBlog'} className="add-blog menu-item">
            <AiOutlineThunderbolt className='icon1'/>
            <AiFillThunderbolt className='icon2'/>
            add Blog
          </NavLink>}
          {isUserLoggedin&&<NavLink to={'/myBlogs'} className="my-blogs menu-item">
            <IoCloudOutline className='icon1'/>
            <IoCloudSharp className='icon2'/>
            my Blogs
          </NavLink>}
          
        </div>}
        <div className="box box4 offCanvasBox">
        <div className="offCanvas">
            <button onClick={openOffcanvas}><ImMenu className='off-icon'/></button>
            <Offcanvas isOpen={isOpen} onClose={closeOffcanvas} isUserLoggedin={isUserLoggedin}>
              
            </Offcanvas>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavigationBar