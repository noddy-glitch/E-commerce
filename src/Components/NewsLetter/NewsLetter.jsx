import React from 'react'
import './NewsLetter.css'
const NewsLetter = () => {
  return (
    <div className='NewsLetter'>
      <h1>Get Exclusive offers on your Email</h1>
      <div>
        <input type="email" placeholder='Your Email Id' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetter
