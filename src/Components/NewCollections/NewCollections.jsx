import React from 'react'
import './NewCollections.css'
// import new_collections from '../Assets/new_collections'
import { useShopContext } from '../../Context/ShopContext'
import Item from '../Items/Item'
const NewCollections = () => {

  
  const {product} = useShopContext();
  const collection = product
  .slice(-4);
  return (
    <div className='NewCollections'>
      <h1>NewCollections</h1>
      <hr />
      <div className="Collections">
      {collection.reverse().map((item,i)=>{
        // debugger
           return <Item  
          //  key={i}
          //   id={item.id} 
          //   name={item.name} 
          //   image={item.image} 
          //   new_price={item.new_price} 
          //   old_price={item.old_price}
          key={item.id}
          {...item}/>
      })}
      </div>
    </div>
  )
}
export default NewCollections
