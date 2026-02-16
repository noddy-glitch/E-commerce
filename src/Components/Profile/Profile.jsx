import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { FaRegCircleUser } from 'react-icons/fa6'
import './Profile.css'
const Profile = () => {
  const navigate = useNavigate();
  const handleLogout =() =>{
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    
    navigate("/login")
  }
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div className='profile-container'>
      <div className="profile-logo">
        <FaRegCircleUser/>
        <p>{currentUser?.name}</p>
         <p>{currentUser?.email}</p>
      </div>
      <div className="order-cart">
        <span><Link to="/myorder">Order</Link></span>
         <span><Link to="/cart">Cart</Link></span>
      </div>
      <div className="logout-btn">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  )
}

export default Profile
