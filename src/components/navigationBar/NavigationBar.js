import React, { useEffect, useState } from 'react'
import './NavigationBar.css'
import image from '../../images/appLogo.png'
import { RiLoginBoxFill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { AiFillThunderbolt } from "react-icons/ai";
import { IoCloudOutline } from "react-icons/io5";
import { IoCloudSharp } from "react-icons/io5";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function NavigationBar() {
  const [isUserLoggedin, setIsUserLoggedin] = useState(false)
  const navigate = useNavigate();

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
        
        <div className="box box2">
          <input type="search" name="search" id="search" placeholder='search'/>
        </div>

        <div className="box box3">
          {
            isUserLoggedin?
            <NavLink to='/profile' style={{textDecoration:"none"}} className="profileBtn"><IoPersonSharp className='navIcon'/> </NavLink>
            :
            <NavLink to={'/login'}  style={{textDecoration:"none"}} className="loginBtn">Login</NavLink>
          }
        </div>

        {<div className="box box4">
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
        
      </div>
    </div>
  )
}

export default NavigationBar