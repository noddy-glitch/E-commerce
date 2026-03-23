import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import LoginSignup from "./Pages/LoginSignup";
import ShopCat from "./Pages/ShopCat";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Sidebar from "./Components/Sidebar/Sidebar";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Assets/banner_mens.png";
import women_banner from "./Assets/banner_women.png";
import kid_banner from "./Assets/banner_kids.png";
import CheckOut from "./Components/CartItems/CheckOut";
import Payment from "./components/Cartitems/Payment";
import Order from "./Components/CartItems/Order";
import Profile from "./Components/Profile/Profile";
import MyOrder from "./Components/MyOrder/MyOrder";
import { useShopContext } from "./Context/ShopContext";
import AdminLayout from "./Components/AdminLayout/AdminLayout";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import AddProduct from "./Components/AddProduct/AddProduct";
import ViewProducts from "./Components/ViewProducts/ViewProducts";
import Orders from "./Components/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { role } = useShopContext();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      {!isAdminRoute && <Navbar />}
      <div className="app-layout">
        {!isAdminRoute && <Sidebar />}

        <div className="main-content">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Shop />} />

            {/* Shop Routes */}
            <Route
              path="/mens"
              element={<ShopCat banner={men_banner} category="men" />}
            />
            <Route
              path="/womens"
              element={<ShopCat banner={women_banner} category="women" />}
            />
            <Route
              path="/kids"
              element={<ShopCat banner={kid_banner} category="kid" />}
            />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order" element={<Order />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myorder" element={<MyOrder />} />
            <Route path="/login" element={<LoginSignup />} />

            {/* Admin Protected Routes */}
            <Route
              path="/admin/*"
              element={role === "admin" ? <AdminLayout /> : <Navigate to="/" />}
            >
              <Route index element={<AdminDashboard />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="add-product/:id" element={<AddProduct />} />
              <Route path="view-products" element={<ViewProducts />} />
              <Route path="view-orders" element={<Orders />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
      {!isAdminRoute && <Footer />}{" "}
    </>
  );
}

export default App;
