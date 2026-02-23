import React from 'react'
import all_product from '../Assets/all_product'
import './ViewProducts.css'


const ViewProducts = () => {
  const products = all_product
  return (
    <div className='view-products'>
      <h2>All Products</h2>
      <table className='product-table'>
<thead>

  <tr>
    <th>ID</th>
    <th>IMAGE</th>
    <th>NAME</th>
    <th>CATEGORY</th>
    <th>NEW PRICE</th>
    <th>OLD PRICE</th>
    <th>ACTIONS</th>
  </tr>
</thead>
<tbody>

  {products.map((product) => (
    <tr key={product.id}>
      <td>{product.id}</td>
      <img src={product.image}
      alt={product.name}
      className='table-image'/>
      <td>{product.name}</td>
      <td>{product.category}</td>
    <td>{product.new_price}</td>
    <td>{product.old_price}</td>
    <td><button className="edit-btn">Edit</button>
    <button className="delete-btn">Delete</button></td>
    
    </tr>
  ))}
</tbody>

      </table>
      
    </div>
  )
}

export default ViewProducts
