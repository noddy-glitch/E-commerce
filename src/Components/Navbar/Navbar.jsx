import React, { useContext, useState,useEffect } from 'react'
import './Navbar.css'
import logo from "../../Assets/logo.png"
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { ShopContext, useShopContext } from '../../Context/ShopContext';
import {RiUserHeartLine} from "react-icons/ri"
import { TfiLocationPin } from 'react-icons/tfi';


const Navbar = () => {
  const { role, getTotalCartItems, isuser } = useShopContext();
  // const {role} = useShopContext();
  // const { getTotalCartItems , isuser } = useContext(ShopContext);
//  const [isLogin,setIsLogin] = useState(false);
// console.log(isuser);

  // useEffect (()=>{
  //   const LoginStatus = localStorage.getItem("isLoggedIn");
  //   if(LoginStatus==="true"){
  //     setIsLogin(true);
  //   }

  // },[]) 
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="logo" />
      </div>

      <div className='search'> <input type="text" placeholder='Search' />
        <button>🔍︎</button>
      </div>
      <div className="admin">
        {role ==="admin" && (
          <Link to="/admin">
            <button>admin</button>
          </Link>
        )}
      </div>
      <div className="nav-login-cart">

{!isuser ?  <Link to="/login">
            <button className='login-btn'>Login</button>
          </Link>
           : <Link to="/profile">
            <div className="profile-img">
              <RiUserHeartLine />
            </div> </Link> }


      
        <Link to="/cart"><span ><FaShoppingCart className='cart-icon' /> </span></Link>
        <div className="nav-part-count">{getTotalCartItems()}</div>
        <div className="delivery-box">
          <Link to="/myorder"><TfiLocationPin/></Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
