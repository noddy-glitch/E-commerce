import React from 'react'
import all_product from "../Assets/all_product";
import './AdminDashboard.css'

const AdminDashboard = () => {

   const products = all_product
   const allProduct = products.length

   const users =JSON.parse(localStorage.getItem("users")) || [];
   const orders = JSON.parse(localStorage.getItem("orders")) || [];
   
return (
  <div className="dashboard">
    <h1 className="dashboard-title">Admin Dashboard</h1>

    <div className="dashboard-cards">

      <div className="card">
        <p className="card-title">Products</p>
        <h2>{allProduct}</h2>
      </div>

      <div className="card">
        <p className="card-title">Users</p>
        <h2>{users.length}</h2>
      </div>

      <div className="card">
        <p className="card-title">Orders</p>
        <h2>{orders.length}</h2>
      </div>

    </div>
  </div>
)
}

export default AdminDashboard
