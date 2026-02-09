import { useContext, useEffect, useState } from 'react'
import React from 'react'
import { ShopContext } from '../../Context/ShopContext'
import { useNavigate } from 'react-router-dom';
import './CheckOut.css'
const CheckOut = () => {
  const { getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  const [address, setAddress] = useState(null)
  const [formVisible, setFormVisible] = useState(false)


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });
  useEffect(()=>{
    const saveAddress = localStorage.getItem("user-Address");
    if(saveAddress){
      setAddress(JSON.parse(saveAddress));
    }
  },[]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setAddress(formData);
    localStorage.setItem("user-Address",JSON.stringify(formData));
    setFormVisible(false);
  }

  const handlePlaceOrder = () => {
    if (!address) {
      alert("Enter Address First")
      return;
    }
    const orderId = Date.now()
    const orderDetails = {
      id: orderId,
      address,
      totalAmount,
      deliveryType: "Today Delivery",
      orderDate: new Date().toISOString(),
      status: "order placed"
    };
    const existingOrder = JSON.parse(localStorage.getItem("customer-order"))|| [];
    localStorage.setItem("customer-order", JSON.stringify([...existingOrder,orderDetails]));
    navigate("/payment", {state: {address,totalAmount,orderId}});

  }
  return (
    <div className='checkout-container'>
      <h2 className="checkout-heading">
        Checkout
      </h2>
      <div className="checkout-section">
        <div className="checkout-left-section">
          {!address && !formVisible && (
            <button
              onClick={() => { setFormVisible(true) }}
              className='add-address-btn'
            >  +Add Address

            </button>
          )}
          {formVisible && (
            <form onSubmit={handleSubmit} className='address-form'>
              <input
                type="text"
                name="name"
                placeholder='Name'
                value={formData.name}
                onChange={handleChange}
                required />
              <input
                type="text"
                name="phone"
                placeholder='mobile no'
                value={formData.phone}
                onChange={handleChange}
                required />
              <input
                type="text"
                name="address"
                placeholder='address'
                value={formData.address}
                onChange={handleChange}
                required />
              <input
                type="text"
                name="city"
                placeholder='city'
                value={formData.city}
                onChange={handleChange}
                required />
              <input
                type="number"
                name="pincode"
                placeholder='pincode'
                value={formData.pincode}
                onChange={handleChange}
                required />
              <button>Save Address</button>
            </form>
          )}
        </div>
        <div className="checkout-right-section">
          {address ? (
            <div className="save-address-btn">
              <h3> Delivery Address</h3>
              <p><b>Name:</b>{address.name}</p>
              <p><b>Phone:</b>{address.phone}</p>
              <p><b>Address:</b>{address.address}</p>
              <p><b>City:</b>{address.city}</p>
              <p><b>Pincdoe:</b>{address.pincode}</p>

              <button className='edit-address-btn' onClick={() => {
                setFormData(address)
                setFormVisible(true)
              }}>Change </button>
              <div className="order-summary-box">
                <p className='order-total'>
                  Total Amount: <span>${totalAmount}</span>
                </p>
                <button className='place-order-btn' onClick={handlePlaceOrder}>Place Order</button>
              </div>
            </div>
          ) : (
            <p className='no-address-text'>No Address Saved Yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckOut
