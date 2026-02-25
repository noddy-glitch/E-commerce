import React from 'react'
import "./Popular.css"
// import data_product from '../../Assets/data'
import Item from '../Items/Item'
import { useShopContext } from '../../Context/ShopContext'
const Popular = () => {
  const {product} = useShopContext();
  const womenproduct = product
  .filter((item)=> item.category ==="women")
  .slice(0,4)
  return (
    <div className='Popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="Popular-item">
       { womenproduct.map((item,i)=>{
        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
             
       })}      </div>
    </div>
  )
}

export default Popular
