import React from 'react'
import { NavLink } from 'react-router-dom'
import { useShopContext } from '../../Context/ShopContext'
import './AdminSidebar.css'
const AdminSidebar = () => {
  const {logout} = useShopContext();
  return (
    <div className='AdminSidebar'>
      <div className="Sidebar-Heading">
        <h1>Admin Panel</h1>
      </div>
      <nav>
      <NavLink to="/admin" className="admin-dashboard">Dashboard</NavLink>
      <NavLink to="/admin/add-product"className="admin-addproduct">Add Products</NavLink>
      <NavLink to="/admin/View-Products" className="admin-view-products">View Products</NavLink>
      <NavLink to="/admin/View-Orders" className="admin-view-Orders">Orders</NavLink>

      </nav>
           <button onClick={logout}>Logout</button>

    </div>
  )
}

export default AdminSidebar
