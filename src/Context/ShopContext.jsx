import React, { createContext, useContext,useEffect,useState } from "react";
import all_product from "../components/Assets/all_product";



export const ShopContext = createContext(null);

const [user, setUser]  =  useState(null);
const [role,setRole]= useState("user")

const login=(email,password,selectedRole) =>{
  setUser({email});
  setRole(selectedRole);
};

useEffect (()=>{
  const savedUser = JSON.parse(localStorage.getItem("currentUser"));

  if(savedUser){
    setRole(savedUser.role);
  }
},[]);
const logout = () =>{
  setUser(null);
  setRole("user");
};
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
}
export const useShopContext = () =>{
  return useContext(ShopContext);
}

const ShopContextProvider = (props) => {

  const [search, setSearch] = useState("");

  const [cartItems, setCartItems] = useState(getDefaultCart());


  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))

  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.new_price;
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
    all_product, cartItems, removeFromCart, clearCart, addToCart, getTotalCartAmount, getTotalCartItems, search, setSearch
  };
  return (
    <ShopContext.Provider value={contextvalue}>
      {props.children}
    </ShopContext.Provider>
  )
}
export default ShopContextProvider;