import React from 'react'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import { Outlet } from 'react-router-dom'
// import "./AdminLayout.css"
const AdminLayout = () => {
  return (
    <div className='admin-Layout'>
     <AdminSidebar/>
     <div className="admin-content">
     <Outlet/>
     </div>
    </div>
    
  )
}

export default AdminLayout
