import React, { useContext } from 'react'
import './Navbar.css'
import logo from "../Assets/logo.png"
import { FaShoppingCart } from "react-icons/fa";
import {Link} from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const {getTotalCartItems} = useContext(ShopContext);
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="logo" />
      </div>
     
      <div className='search'> <input type="text" placeholder='Search' />
      <button>🔍︎</button>
      </div>
      <div className="nav-login-cart">
        <Link to="/login"><button className="login-btn">login</button></Link>
        <Link to="/cart"><span ><FaShoppingCart className='cart-icon' /> </span></Link>
        <div className="nav-part-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
