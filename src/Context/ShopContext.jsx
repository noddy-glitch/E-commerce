import React, { createContext, useContext,useEffect,useState } from "react";
import all_product from "../Components/Assets/all_product";



export const ShopContext = createContext(null);



const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
}
export const useShopContext = () =>{
  return useContext(ShopContext);
}

const ShopContextProvider = (props) => {
  const [isuser , setisuser] = useState(localStorage.getItem("isLoggedIn"))
  

const [user, setUser] = useState(null);
const [role, setRole] = useState("user");
const [product,setProduct] = useState([])

useEffect(() =>{
const savedProducts = JSON.parse(localStorage.getItem("products"));

if(savedProducts){
  setProduct(savedProducts);
  setCartItems(getDefaultCart(savedProducts));
}else{
  setProduct(all_product);
  localStorage.setItem("prodct",JSON.stringify(all_product));
  setCartItems(getDefaultCart(all_product));
}

},[]);

const addproduct = (productData)=>{
const upDatedProducts = [...product, productData];
setProduct(upDatedProducts);
localStorage.setItem("products",JSON.stringify(upDatedProducts));

}

useEffect(() => {
  const savedUser = JSON.parse(localStorage.getItem("currentUser"));
  if (savedUser) {
    setUser(savedUser);
    setRole(savedUser.role);
  }
}, []);

const login = (email, password, selectedRole) => {
  const userData = { email, role: selectedRole };

  localStorage.setItem("currentUser", JSON.stringify(userData));

  setUser(userData);
  setRole(selectedRole);
};

const logout = () => {
  localStorage.removeItem("currentUser");

  setUser(null);
  setRole("user");
};


  const [search, setSearch] = useState("");

  const [cartItems, setCartItems] = useState(getDefaultCart());


  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))

  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = product.find((product) => product.id === Number(item));
        if(itemInfo){
        totalAmount += cartItems[item] * itemInfo.new_price;
        }
      }
    }
    return totalAmount;
  }

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  }


  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

  }
  const clearCart = () =>{
    setCartItems(getDefaultCart());
  }

 const contextvalue = {

  all_product,
  cartItems,
  removeFromCart,
  clearCart,
  addToCart,
  getTotalCartAmount,
  getTotalCartItems,
  search,
  setSearch,
  login,
  logout,
  user,
  role ,
  setisuser,
  isuser,
  product,
  addproduct,
  setProduct

};

 
  return (
    <ShopContext.Provider value={contextvalue}>
      {props.children}
    </ShopContext.Provider>
  )
}
export default ShopContextProvider;