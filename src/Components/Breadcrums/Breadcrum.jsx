import React from 'react'
import './Breadcrum.css'
import breadcrum_arrow from '../../Assets/breadcrum_arrow.png' 

const Breadcrum = (props) => {
  const {product} = props
  return (
    <div className='breadcrum'>
      HOME <img src={breadcrum_arrow} alt="arrow-icon" />
      SHOP <img src={breadcrum_arrow} alt="arrow-icon" />
      {product.category} <img src={breadcrum_arrow} alt="arrow-icon" />
       {product.name} 

    </div>
  )
}

export default Breadcrum
