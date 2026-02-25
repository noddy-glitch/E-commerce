import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import LoginSignup from './pages/LoginSignup'
import ShopCat from './Pages/ShopCat'
import Shop from './Pages/Shop'
import Cart from './Pages/Cart'
import Product from './Pages/Product'
import Sidebar from './Components/Sidebar/Sidebar'
import Footer from './Components/Footer/Footer'
import men_banner from './Assets/banner_mens.png'
import women_banner from './Assets/banner_women.png'
import kid_banner from './Assets/banner_kids.png'
import CheckOut from "./Components/CartItems/CheckOut"
import Payment from './components/Cartitems/Payment'
import Order from './Components/CartItems/Order'
import Profile from './Components/Profile/Profile'
import MyOrder from './Components/MyOrder/MyOrder'
import { useShopContext } from './Context/ShopContext'
import AdminLayout from './Components/AdminLayout/AdminLayout'
import AdminDashboard from './Components/AdminDashboard/AdminDashboard'
import AddProduct from './Components/AddProduct/AddProduct'
import ViewProducts from './Components/ViewProducts/ViewProducts'
import Orders from './Components/Orders/Orders'

function App() {
  const { role } = useShopContext();

  return (
    <>
      
      {role !== "admin" && <Navbar />}

      <div className="app-layout">
        
       
        {role !== "admin" && <Sidebar />}

        <div className="main-content">
          <Routes>

       
            <Route
              path="/"
              element={
                role === "admin"
                  ? <Navigate to="/admin" />
                  : <Shop />
              }
            />

          
            <Route path="/mens" element={<ShopCat banner={men_banner} category="men" />} />
            <Route path="/womens" element={<ShopCat banner={women_banner} category="women" />} />
            <Route path="/kids" element={<ShopCat banner={kid_banner} category="kid" />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order" element={<Order />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myorder" element={<MyOrder />} />
            <Route path="/login" element={<LoginSignup />} />

          
            <Route
              path="/admin/*"
              element={
                role === "admin"
                  ? <AdminLayout />
                  : <Navigate to="/" />
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="add-product" element={<AddProduct/>} />
               <Route path="View-Products" element={<ViewProducts/>} />
               <Route path='View-Orders' element={<Orders/>}></Route>
                </Route>

           
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>

     
      {role !== "admin" && <Footer />}
    </>
  );
}

export default App








