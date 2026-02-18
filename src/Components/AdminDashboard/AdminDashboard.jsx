import React from 'react'
import all_product from "../Assets/all_product";

const AdminDashboard = () => {

   const products = all_product
   const allProduct = products.length
   
  return (
    <div>
    <h2>Product:{allProduct}</h2>
    </div>
  )
}

export default AdminDashboard
