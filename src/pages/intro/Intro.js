import React from 'react'
import './Intro.css'
import blogger_image from '../../images/blogger_image.webp'
function Intro() {
  return (
    <div className='Intro'>
      <div className="left">
        <img  src={blogger_image} alt="" />
      </div>
      <div className="right">
        <span className="quote">
          Your Blog is your <span style={{ fontFamily: 'cursive', color:'#007AC3'}}> brand</span><br/> 
          It is a  reflection of <span className="main-quote"> you</span>, your <span className="main-quote">thoughts </span> & <span className="main-quote">values</span> <br/>

        </span>
        <span className='quote-content' style={{
          fontSize:'larger',
          fontFamily:'sans-serif',
          lineHeight:'25px',
          // letterSpacing:'1px',
          fontStyle:'italic',
          color:'#154351',
        }}>Blogging fosters community, connections, and collaboration, offering a platform where voices are heard, stories are shared, and relationships flourish.It cultivates a vibrant network where ideas converge, experiences intertwine, and individuals find inspiration, empowerment, and endless opportunities for growth</span>
      </div>
    </div>
  )
}

export default Intro