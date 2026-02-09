import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div>
      <ul className="nav-menu">
              <li><Link to="/"><span></span>Shop </Link></li>
              <li><Link to="/mens"><span></span>Men</Link></li>
              <li><Link to="/womens"><span></span>Women</Link></li>
              <li><Link to="/kids"><span></span>Kids</Link></li>
            </ul>
    </div>
  )
}

export default Sidebar
