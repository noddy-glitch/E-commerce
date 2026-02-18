import React, { createContext, useContext,useEffect,useState } from "react";
import all_product from "../Components/Assets/all_product";



export const ShopContext = createContext(null);



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
  const [isuser , setisuser] = useState(localStorage.getItem("isLoggedIn"))
  

const [user, setUser] = useState(null);
const [role, setRole] = useState("user");

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
  isuser

};


  return (
    <ShopContext.Provider value={contextvalue}>
      {props.children}
    </ShopContext.Provider>
  )
}
export default ShopContextProvider;