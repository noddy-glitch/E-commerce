import { useEffect, useState } from "react";
import "./MyOrder.css";

const MyOrders = () => {
 const [orders, setOrders] = useState([]);

 useEffect(() => {
 const savedOrders =
 JSON.parse(localStorage.getItem("customer-orders")) || [];

 setOrders([...savedOrders].reverse());

 }, []);

 return (
 <div className="orders-container">
 <h2>My Orders</h2>

 {orders.length === 0 ? (
 <p>No orders placed yet</p>
 ) : (
orders

 .map((order) => (
 <div key={order.id} className="order-card">
 <h3>Order ID: {order.id}</h3>
 <p>
 Date: {new Date(order.orderDate).toLocaleDateString()}
 </p>
 <p>Total: ₹{order.totalAmount}</p>

 {/* PRODUCTS */}
 <div className="ordered-products">
 {(order.products || []).map((item) => (
 <div key={item.id} className="ordered-item">
 <img src={item.image} alt={item.name} />
 <div>
 <p>{item.name}</p>
 <p>
 ₹{item.price} × {item.quantity}
 </p>
 </div>
 </div>
 ))}
 </div>

 {/* TRACKING */}
{order.status === "Order Placed" &&
 order.tracking &&
 order.tracking.length > 0 && (
 <>
 <h4>Order Tracking</h4>
 <ul className="tracking-list">
 {order.tracking.map((step, index) => (
 <li
 key={index}
 className={step === order.status ? "active" : ""}
 >
 {step}
 </li>
 ))}
 </ul>
 </>
)}

 </div>
 ))
 )}
 </div>
 );
};

export default MyOrders;
