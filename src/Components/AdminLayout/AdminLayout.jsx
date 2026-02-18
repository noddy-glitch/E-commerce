import React from 'react'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import { Outlet } from 'react-router-dom'
const AdminLayout = () => {
  return (
    <div>
     <AdminSidebar/>
     <Outlet/>
    </div>
    
  )
}

export default AdminLayout
