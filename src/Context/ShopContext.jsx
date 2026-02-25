import React, { createContext, useContext,useEffect,useState } from "react";
import all_product from "../Assets/all_product";



export const ShopContext = createContext(null);



const getDefaultCart = (products) => {
  let cart = {};
  products.forEach((item) => {
    cart[item.id] = 0;
  });
  return cart;
};

export const useShopContext = () =>{
  return useContext(ShopContext);
}

const ShopContextProvider = (props) => {
  // const [isuser , setisuser] = useState(localStorage.getItem("isLoggedIn"))
  const [isuser, setisuser] = useState(() => {
    return localStorage.getItem("isLoggedIn") === 'true';
  });
    

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
  localStorage.setItem("products",JSON.stringify(all_product));
  setCartItems(getDefaultCart(all_product));
}

},[]);


useEffect(() => {
  const savedUser = JSON.parse(localStorage.getItem("currentUser"));
  if (savedUser) {
    setUser(savedUser);
    setRole(savedUser.role);
  }
}, []);

const login = (email,password, selectedRole) => {
  const userData = { email, role: selectedRole };

  localStorage.setItem("currentUser", JSON.stringify(userData));
  localStorage.setItem("isLoggedIn", true);
setisuser(true);
  setUser(userData);
  setRole(selectedRole);
};

const logout = () => {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("isLoggedIn");
  setisuser(false);
  setUser(null);
  setRole(null);
};




const [search, setSearch] = useState("");

const [cartItems, setCartItems] = useState({});


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
  setCartItems(getDefaultCart(product));
}

const deleteproduct = ((id) => {

  const updatedProducts = product.filter(
    (product) => product.id !==id
  );
  setProduct(updatedProducts);
  localStorage.setItem("products",JSON.stringify(updatedProducts));
  setCartItems(getDefaultCart(updatedProducts))
})

const addProduct = (productData) => {
  const newProduct = {
    ...productData,
    id: product.length + 1, //new id
  };

  const updatedProducts = [...product, newProduct];
  setProduct(updatedProducts);
  localStorage.setItem("products", JSON.stringify(updatedProducts));

  setCartItems(getDefaultCart(updatedProducts));
};

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
  addProduct,
  setProduct,
deleteproduct};

 
  return (
    <ShopContext.Provider value={contextvalue}>
      {props.children}
    </ShopContext.Provider>
  )
}
export default ShopContextProvider;