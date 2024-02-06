import React, { useState } from 'react'
import './AddBlog.css'
import { useForm } from 'react-hook-form'
import { BsSendFill } from "react-icons/bs";
import axios from 'axios';
import DateTime from '../../assets/DateTime';

function AddBlog() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagsErr, setTagsErr] = useState(false)
  
  const handleSelectChange = (event) => {
    const clickedValue = event.target.value;
    
    // Check if the clicked option is already selected
    if (selectedTags.includes(clickedValue)) {
      // If selected, remove it from the array
      const updatedOptions = selectedTags.filter((option) => option !== clickedValue && option!=='');
      setSelectedTags(updatedOptions);
    } else {
      // If not selected, add it to the array
      setSelectedTags([...selectedTags, clickedValue]);
    }
    setTagsErr(false);
  };
  
  function onSubmit(data){
    data.tags = selectedTags;
    //handle tag error
    if(selectedTags.length === 0) {
      setTagsErr(false);
      try{
        setTimeout(()=>{setTagsErr(true);},20)
      }catch(err){console.log(err)}
    }
    else {
      const token = localStorage.getItem('token');
      if(!token) window.location.reload();
      //verify token
      axios.post('http://localhost:3500/accounts/verifyLoginToken',{token})
      .then((res)=>{ 
        if(!res.data.valid) {
          window.location.reload();
        }
        const userData = res.data.payload
        console.log("USER DATA:",userData)
        // Post the blog
        data.createdByEmail = userData.email
        data.timeStamp = DateTime();
        console.log("Blog Data", data)

        axios.post('http://localhost:3500/blogs/postBlog',data)
        .then((res)=>{
          console.log('resonse from server:',res)
          alert('Blog inserted succesfully')
          window.location.reload();
        })
        .catch((err)=>{
          alert('Something went wrong')
          window.location.reload();
          console.log(err)
        })
      })
      .catch((err)=>{
        window.location.reload();
      })
    }
  }
  return ( 
    <div className='addBlog'> 
      <div className="blogAdder">
        <form action="" className='blogAdderForm' onSubmit={handleSubmit(onSubmit)}>
          <div className="blogInputBox">
            <textarea className='content'  placeholder='Write content of your blog here...'  name="content" id="content" required={true} {...register('content')}  />
          </div> 

          <div className={tagsErr?"seletedTags err":"seletedTags"}>
            <textarea name="selectedTags" placeholder='select tags'   id="selectedTags" value={selectedTags}
            ></textarea>
          </div>
            {/* MULTI SELECT */}
          <div className="blogInputBox">
            <div className="tags">
              <span>Select Atleast one tag:</span>
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
                {/* Add more options as needed */}
              </select>
            </div>
          </div>

          <div className="blogInputBox submit">
            <button>Post <BsSendFill className='blogSend'/></button>
            
          </div>
        </form>
      </div>
    </div> 
  )
}

export default AddBlog