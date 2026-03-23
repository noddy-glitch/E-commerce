import React, { useEffect, useState } from "react";
import "./Orders.css";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const savedOrders =
      JSON.parse(localStorage.getItem("customer-orders")) || [];

    setOrders(savedOrders);

  }, []);

  return (
    <div className="admin-orders">

      <h2>All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (

        <table className="orders-table">

          <thead>
            <tr>
              <th>Order ID</th>
              <th>User Email</th>
              <th>Total Amount</th>
            </tr>
          </thead>

          <tbody>

            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userEmail}</td>
                <td>${order.totalAmount}</td>
              </tr>
            ))}

          </tbody>

        </table>
      )}

    </div>
  );
};

export default Orders;
