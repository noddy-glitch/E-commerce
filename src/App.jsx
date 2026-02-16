// import { Routes, Route } from 'react-router-dom'
// import './App.css'
// import Navbar from './Components/Navbar/Navbar'
// import LoginSignup from './Pages/LoginSignup'
// import ShopCat from './Pages/ShopCat'
// import Shop from './Pages/Shop'
// import Cart from './Pages/Cart'
// import Product from './Pages/Product'
// import Sidebar from './Components/Sidebar/Sidebar'
// import Footer from './Components/Footer/Footer'
// import men_banner from './Components/Assets/banner_mens.png'
// import women_banner from './Components/Assets/banner_women.png'
// import kid_banner from './Components/Assets/banner_kids.png'
// import CheckOut from "./Components/CartItems/CheckOut";
// import Payment from './Components/CartItems/Payment'
// import Order from './Components/CartItems/Order'
// import Profile from './Components/Profile/Profile'
// import MyOrder from './Components/MyOrder/MyOrder'
import Admin from "./Components/Admin/Admin"
import { useShopContext } from './context/ShopContext'
import AdminLayout from './components/Admin/AdminLayout'
import AdminDashboard from './components/Admin/AdminDashboard'
// function App() {

    
//   return (
//     <>
//       <Navbar />
//       <div className="app-layout">
//         <Sidebar />
//         <div className="main-content">
//           <Routes>
//             <Route path="/" element={<Shop />} />
//             <Route path="/mens" element={<ShopCat banner={men_banner} category="men" />} />
//             <Route path="/womens" element={<ShopCat banner={women_banner} category="women" />} />
//             <Route path="/kids" element={<ShopCat banner={kid_banner} category="kid" />} />
//             {/* <Route path="/product" element={<Product />} /> */}
//             <Route path='/product/:productId' element={<Product />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/payment" element={<Payment/>} />
//             <Route path="/order" element={<Order />} />
//             <Route path="/login" element={<LoginSignup />} />
//             <Route path="/CheckOut" element={<CheckOut />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/myorder" element={<MyOrder />} />


//           </Routes>
//         </div>
//       </div>
//       <Footer />
//     </>

//   )
// }

// export default App


import './App.css'
import Navbar from './components/Navbar/Navbar'
import {  Route, Routes } from 'react-router-dom'
import ShopCato from './pages/ShopCato'
import LoginSignup from './pages/LoginSignup'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Footer from './components/Footer/Footer'
import men_banner from './components/Assets/banner_mens.png'
import women_banner from './components/Assets/banner_women.png'
import kids_banner from './components/Assets/banner_kids.png'
import CheckOut from './components/Cartitems/CheckOut'
import Payment from './components/Cartitems/Payment'
import Order from './components/Cartitems/order'
import MyOrders from './components/MyOrder/MyOrder'
import Profile from './components/Profile/Profile'




function App() {
  const { role } = useShopContext();
  

  return (

    role === "admin" ? (

        // 🔥 ADMIN ROUTES
        <Route element={<AdminLayout />}>
          <Route path="/*" element={<AdminDashboard />} />
        </Route>

      ) : (
  
  <>
  <header>
  <Navbar/>
  </header>
    <main className="page-content">

  <Routes>
    <Route path='/' element={<Shop/>} />
        <Route path='/mens' element={<ShopCato banner ={men_banner}category="men"/>} />
        <Route path='/womens' element={<ShopCato banner ={women_banner}category="women"/>} />
        <Route path='/kids' element={<ShopCato  banner ={kids_banner}category="kid"/>} />
  
<Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<LoginSignup/>} />

        <Route path='/checkout' element={<CheckOut/>}/>

        <Route path='/payment' element={<Payment/>}/>
        <Route path='/order' element={<Order/>}/>

        <Route path="/orders" element={<MyOrders />} />
        <Route path="/profile" element={<Profile/>}/>
        {/* <Route path="/admin" element={<Admin/>}/> */}
        <Route path="*" element={<h2>Page Not Found</h2>} />

        
        
        
        </Routes>
        </main>
        <Footer/>
        </>
        
      )
        
      )
    }
    
export default App