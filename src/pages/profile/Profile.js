import React, { useEffect, useState } from 'react'
import './Profile.css'
import male_profile from '../../images/male_profile.png'
import female_profile from '../../images/female_profile.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const [userDetails,setUserDetails]=useState()
  const [blogCatogeries,setBlogCatogeries] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem('token')
    axios.post('http://localhost:3500/accounts/verifyLoginToken',{token})
    .then((res)=>{ 
      setUserDetails(res.data.payload);
      console.log(res.data.payload)
    })
    .catch((err)=>{
      console.log('something went wrong  ERR:',err)
      alert('Something went wrong! please login again');
      localStorage.clear();
      navigate('/login')
    })
  },[])
  //find blogging histry
  useEffect(() => {
    if (userDetails && userDetails.blogs) {
      const frequencyMap = {};
  
      // Iterate through each blog
      userDetails.blogs.forEach(blog => {
        // Iterate through each tag in the blog
        blog.tags.forEach(tag => {
          // Increment the count of the tag in the frequency map
          frequencyMap[tag] = (frequencyMap[tag] || 0) + 1;
        });
      });
  
      const tagFrequencyArray = Object.entries(frequencyMap).map(([tag, frequency]) => ({
        tag,
        frequency
      }));
      setBlogCatogeries(tagFrequencyArray)
      console.log(tagFrequencyArray)
    }
  }, [userDetails]);
  


  return (
    <div className='profile'>
      <div className="personal-details">
        <div className="user-pic">
          <img src={male_profile}  alt="" />
        </div>
        <div className="user-data">
          <p>Blogger : <span>{userDetails?.userName}</span></p>
          <p>Email : <span>{userDetails?.email}</span></p>
          <p>Mobile : <span>{userDetails?.mobile}</span></p>
          <p>Bloggings: <span>{userDetails?.blogsCount}</span></p>
        </div>
      </div>
      <div className="blogging-details">
        <p className='blogging-details-title'>Blogging History</p>
        <div className="tags-frecquencies">
          {blogCatogeries.map(({ tag, frequency }) => (
            <div  key={tag}>
              <p> {tag}</p>
              <p> {frequency}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile