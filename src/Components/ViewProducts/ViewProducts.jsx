import React from 'react'
import { useShopContext } from '../../Context/ShopContext'
import { useNavigate } from 'react-router-dom';
import './ViewProducts.css'

const ViewProducts = () => {

  const navigate = useNavigate(); // ✅ moved inside

  const { product, deleteproduct } = useShopContext();

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
          {product.map((item) => (   // ✅ renamed for clarity
            <tr key={item.id}>
              <td>{item.id}</td>

              <td>
                <img
                  src={
                    typeof item.image === 'string'
                      ? item.image
                      : (item?.image[0] || '')
                  }
                  alt={item.name}
                  className='table-image'
                />
              </td>

              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.new_price}</td>
              <td>{item.old_price}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/admin/add-product/${item.id}`)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteproduct(item.id)}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default ViewProducts