import React from "react";
import "./Payment.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useShopContext } from "../../Context/ShopContext";
import { useState } from "react";

const Payment = () => {
 const location = useLocation();
 const navigate = useNavigate();
 const { address, totalAmount, orderId, products } =
  location.state || {};

//  const { address, totalAmount, orderId } = location.state || {};


 const [paymentMethod, setPaymentMethod] = useState("");
 const [deliveryOption, setDeliveryOption] = useState("free");
 const [upiId, setUpiId] = useState("");
 const [cardDetails, setCardDetails] = useState({
 cardNumber: "",
 expiry: "",
 cvv: "",
 name: "",
 });
 const [couponCode, setCouponCode] = useState("");
 const [discountPercent, setDiscountPercent] = useState(0);

 const { clearCart } = useShopContext();

 const coupons = {
 SAVE10: 10,
 SAVE20: 20,
 WELCOME5: 5,
 };

 const deliveryCharges = {
 today: 100,
 fast: 50,
 free: 0,
 }[deliveryOption];

 const finalAmount = (totalAmount || 0) + deliveryCharges;
 const discountAmount = (finalAmount * discountPercent) / 100;
 const discountedAmount = finalAmount - discountAmount;

 const handleApplyCoupon = () => {
 const code = couponCode.trim().toUpperCase();
 if (coupons[code]) {
 setDiscountPercent(coupons[code]);
 alert(`Coupon applied! You got ${coupons[code]}% off.`);
 } else {
 setDiscountPercent(0);
 alert("Invalid coupon code!");
 }
 };

 const handleCardChange = (e) => {
 setCardDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
 };

 const updateTotalIncome = (amount) => {
 const prevIncome = Number(localStorage.getItem("totalIncome")) || 0;
 localStorage.setItem(
 "totalIncome",
 (prevIncome + Number(amount)).toFixed(2),
 );
 };

 const saveOrderHistory = (order) => {
 const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
 history.push(order);
 localStorage.setItem("orderHistory", JSON.stringify(history));
 };

 const handleConfirmOrder = () => {
 if (!address || !totalAmount) {
 alert("Session expired. Please place order again.");
 navigate("/checkout");
 return;
 }

 if (!paymentMethod) {
 alert("⚠️ Please select a payment method.");
 return;
 }

 if (paymentMethod === "upi" && !upiId) {
 alert("⚠️ Please enter your UPI ID.");
 return;
 }

 if (paymentMethod === "card") {
 const { cardNumber, expiry, cvv, name } = cardDetails;
 if (!cardNumber || !expiry || !cvv || !name) {
 alert("⚠️ Please fill in all card details.");
 return;
 }
 }

 // Build order object
 const order = {
 id: orderId,
 address,
 paymentMethod,
 deliveryOption,
 amountPaid: discountedAmount.toFixed(2),
 date: new Date().toLocaleString(),
 };

 updateTotalIncome(discountedAmount);

// ⭐ Get products from cart
// const cartProducts =
//   JSON.parse(localStorage.getItem("cartItems")) || [];

// // ⭐ Build FULL order object
// const fullOrder = {
//   id: orderId,
//   address,
//   totalAmount: discountedAmount,
//   orderDate: new Date().toISOString(),
//   status: "Order Placed",
//   products: cartProducts
// };
const fullOrder = {
  id: orderId,
  address,
  totalAmount: discountedAmount,
  orderDate: new Date().toISOString(),

  status: "Order Placed",

  tracking: [
    "Order Placed",
    "Packed",
    "Out for Delivery",
    "Delivered"
  ],

  products: products   // ⭐ Correct source
};


// ⭐ Save to SAME key MyOrders reads
const existingOrders =
  JSON.parse(localStorage.getItem("customer-orders")) || [];

localStorage.setItem(
  "customer-orders",
  JSON.stringify([...existingOrders, fullOrder])
);

 alert(`✅ Order Placed! Total Paid: ₹${discountedAmount.toFixed(2)}`);

 localStorage.removeItem("cartItems");
 clearCart();

 setTimeout(() => navigate("/"), 3000);
 };
  return (
    <div className='payment'>
      <h2>Payment</h2>
      <div className="payment-content">
        <div className="payment-left">
          <h3>Delivery Address</h3>
          {address ? (
            <p>
              <b>Name:</b>{address.name} <br />
              <b>Phone:</b>{address.phone} <br />
              <b>Address:</b>{address.address} <br />
              <b>City:</b>{address.city} <br />
              <b>Pincode:</b>{address.pincode} <br />
            </p>
          ) : (
            <p>No Address Found</p>
          )}
          <div className="payment-bottom">
            <div className="security-item">
              <span>100% Secure Payment</span>
            </div>
            <div className="security-item">
              <span>Verified Checkout</span>
            </div>
            <div className="security-item">
              <span>Trusted By Thousands</span>
            </div>
            <div className="security-item-payment-brands">
              {/* icons of brand*/}
            </div>
          </div>
        </div>
        <div className="payment-right">
          <h3>Select the Payment Method</h3>
          <select className='Payment-dropdown'
            value={paymentMethod}
            onChange={(e) => {
              setPaymentMethod(e.target.value)
            }}>


            <option value="">-- Select Payment Method --</option>
            <option value="upi">UPI</option>
            <option value="card">Debit Card/Credit Card</option>
            <option value="cod">Cash On Delivery</option>
          </select>
          {paymentMethod === "upi" && (
            <div className="upi-box">
              <input
                type="text"
                placeholder='Enter UPI Id (@upi)'
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
          )}
          {paymentMethod === "card" && (
            <div className="card-details">
              <input type="text"
                name='cardNumber'
                placeholder='Card Number'
                value={cardDetails.cardNumber}
                maxLength={16}
                onChange={handleCardChange}
              />
              <div className="card-row">
                <input type="text"
                  name='expiry'
                  placeholder='MM/YY'
                  value={cardDetails.expiry}
                  maxLength={5}
                  onChange={handleCardChange}
                />

                <input type="password"
                  placeholder='CVV'
                  name='cvv'
                  value={cardDetails.cvv}
                  maxLength={3}
                  onChange={handleCardChange}
                />
              </div>
              <input
                type="text"
                name='name'
                placeholder='Card Holder Name'
                value={cardDetails.name}
                onChange={handleCardChange}
              />
            </div>
          )
          }
          <h3>Delivery Options</h3>
          {["today", "fast", "free"].map((option) => {
            const labelMap = {
              today: " Deliver Today($100)",
              fast: " Deliver in 1-2 Days($50)",
              free: " Standard Delivery (Free) ",
            };
            return (
              <label key={option}>
                <input type="radio"
                  name="delivery"
                  value={option}
                  checked={deliveryOption === option}
                  onChange={(e) => setDeliveryOption(e.target.value)} />
                {labelMap[option]}
              </label>
            );

          })}
          <div className="coupon-box">
            <h3>Have a Coupon?</h3>
            <input type="text"
              placeholder='Enter coupon code'
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)} />
            <button className='apply-coupon-btn' onClick={handleApplyCoupon}>Apply</button>
            {discountPercent > 0 && (
              <p className='coupon-success'>
                you saved {discountPercent}% on this order!
              </p>
            )}

          </div>
          <div className="final-summary">
            <p>Cart Total: ${totalAmount?.toFixed(2) || "0.00"}</p>
            <p>Delivery Charges: ${deliveryCharges.toFixed(2)}</p>
            {discountPercent > 0 && (
              <p>Discount: -${discountAmount.toFixed(2)}</p>
            )}
            <h3>Final Amount: ${discountedAmount.toFixed(2)}</h3>
          </div>

          <button className="confirm-btn" onClick={handleConfirmOrder}>
            Confirm & Pay
          </button>


        </div>
      </div>
    </div>
  )
}

export default Payment
