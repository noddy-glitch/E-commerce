
import React, { useState, useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { useNavigate } from 'react-router-dom'
import empty_icon from '../Assets/empty_icon.png'


const CartItems = () => {
  const { all_product, cartItems, removeFromCart, getTotalCartAmount, } = useContext(ShopContext)

  const [shippingCost, setShippingCost] = useState(0);
  const navigate = useNavigate();

const totalAmount = getTotalCartAmount();
if(totalAmount ===0 ){
  return(
<div className="empty-img">
  <img src={empty_icon} alt="cart is Empty" />
</div>

  );
}


  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {
        all_product.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div key={e.id}>
                <div className="cartitems-format">
                  <img className='carticon-product-icon' src={e.image} alt={e.name} />
                  <p>{e.name}</p>
                  <p>${e.new_price}</p>
                  <button className='cartitem-quantity'>{cartItems[e.id]}</button>
                  <p>  ${e.new_price * cartItems[e.id]}</p>
                  <img
                    className='cartitems-remove-icon'
                    src={remove_icon}
                    alt='remove item'
                    onClick={() => { removeFromCart(e.id) }} />
                </div>
                <hr />
              </div>

            )
          }
          return null
        })
      }
      <div className="cartitem-total">
        <h1>Cart Total</h1>
        <div className="cart-item-total-item">
          <p>SubTotal</p>
          <p>${getTotalCartAmount()}</p>
        </div>
        <hr />

        <div className="cart-item-total-item">
          <div className="cartitem-shipping">
            <h3>Shipping method</h3>
            <label>
              <input type="radio"
                name='shipping'
                checked={shippingCost === 0}
                onChange={() => {
                  setShippingCost(0)
                }} />
              Free Shipping($0)
            </label>

            <label>
              <input type="radio"
                name='shipping'
                checked={shippingCost === 100}
                onChange={() => {
                  setShippingCost(100)
                }} />
              Express Shipping($100)
            </label>

          </div>
        </div>
        <hr />
        <div className="cart-item-total-item">
          <h3>Total</h3>
          <h3>${getTotalCartAmount() + shippingCost}</h3>
        </div>
        <button
          className='cartitem-checkout-button'
          onClick={() => navigate("/checkout")}
        >
          Proceed To Checkout
        </button>
      </div>
      <div className="cartitem-promocode">
        <p>if you have promocode, Enter it here.</p>
        <div className="cartitem-promobox">
          <input type="text" placeholder='promocode' />
          <button className="cartitem-apply-button">Apply</button>
        </div>
      </div>
    </div>
  )
}

export default CartItems

