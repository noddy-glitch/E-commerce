import React from 'react'
import { useShopContext } from '../../Context/ShopContext'

const AddProduct = () => {
  const {addProduct} = useShopContext();

  const[data,setData] =({
id:"",
name:"",
image:"",

  })
  return (
    <div>
      
    </div>
  )
}

export default AddProduct
