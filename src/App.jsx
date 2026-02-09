import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import LoginSignup from './Pages/LoginSignup'
import ShopCat from './Pages/ShopCat'
import Shop from './Pages/Shop'
import Cart from './Pages/Cart'
import Product from './Pages/Product'
import Sidebar from './Components/Sidebar/Sidebar'
import Footer from './Components/Footer/Footer'
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import CheckOut from "./Components/CartItems/CheckOut";
import Payment from './Components/CartItems/Payment'
import Order from './Components/CartItems/Order'
function App() {


  return (
    <>
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/mens" element={<ShopCat banner={men_banner} category="men" />} />
            <Route path="/womens" element={<ShopCat banner={women_banner} category="women" />} />
            <Route path="/kids" element={<ShopCat banner={kid_banner} category="kid" />} />
            {/* <Route path="/product" element={<Product />} /> */}
            <Route path='/product/:productId' element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment/>} />
            <Route path="/order" element={<Order />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/CheckOut" element={<CheckOut />} />

          </Routes>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default App
