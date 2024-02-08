
import React from 'react';
import './Offcanvas.css';
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
import { IoMdClose } from "react-icons/io";
const Offcanvas = ({ isOpen, onClose, isUserLoggedin }) => {
  const handleClick = () => {
    if (isOpen) {
      onClose();
    }
  };

  return (
    <div className={`offcanvas-container ${isOpen ? 'open' : ''}`}>
      <div className="offcanvas-overlay" onClick={onClose}></div>
      <div className="offcanvas-content" >
        <button className="close-btn" onClick={onClose}>
          <IoMdClose style={{
            width:'2rem',height:'2rem',backgroundColor:'#B1FDFD',color:'#0296DE'
          }}/>
        </button>
        <div className="off-content">
          <NavLink to="/Home" activeClassName="active" className="home menu-item" onClick={handleClick}>
            <IoHomeOutline className='icon1'/>
            <IoHomeSharp className='icon2'/>
            Home
          </NavLink>
          {isUserLoggedin && (
            <NavLink to="/addBlog" className="add-blog menu-item" onClick={handleClick}>
              <AiOutlineThunderbolt className='icon1'/>
              <AiFillThunderbolt className='icon2'/>
              Add Blog
            </NavLink>
          )}
          {isUserLoggedin && (
            <NavLink to="/myBlogs" className="my-blogs menu-item" onClick={handleClick}>
              <IoCloudOutline className='icon1'/>
              <IoCloudSharp className='icon2'/>
              My Blogs
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Offcanvas;
