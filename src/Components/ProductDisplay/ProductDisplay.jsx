import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_dull_icon from "../../Assets/star_dull_icon.png"
import star_icon from "../../Assets/star_icon.png"
import { ShopContext } from '../../Context/ShopContext'
import { useNavigate } from 'react-router-dom'
const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  const [zoomStyle, setZoomStyle] = useState({
    transform: 'scale(1)',
    transformOrigin: 'center'
  })

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomStyle({
      transform: 'scale(2)',
      transformOrigin: `${x}% ${y}%`
    })
  }
  const handleMouseLeave = () => {
    setZoomStyle({
      transform: 'scale(1)',
      transformOrigin: 'center'
    })
  }
  const navigate = useNavigate();
  const isLoggedIn= localStorage.getItem("isLoggedIn")=== "true";
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-image-list">
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
        </div>
        <div className="productdisplay-image">
          <img className="productdisplay-main-image"
            src={product.image}
            alt={product.name}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={zoomStyle}
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_dull_icon} alt="star" />
          <p>134</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
          <div className="productdisplay-right-description">
            A lightweight,usually knitted pullover shirt, close-fitting,worn as an undershirt or outer garment.
          </div>
          <div className="productdisplay-right-size">
            <p>Size:</p>
            <div className="productdisplay-right-size-options">
              <div className="size-option">S</div>
              <div className="size-option">M</div>
              <div className="size-option">L</div>
              <div className="size-option">XL</div>
              <div className="size-option">XXL</div>
            </div>
          </div>

          <button className="add-to-cart" onClick={() => {
            if (isLoggedIn) {
              addToCart(product.id);
            } else {
              navigate("/login");
            }
          }}>Add to Cart</button>
          <p className='productdisplay-right-category'><span>Category:</span>Women, T-shirt,Crop-top</p>
          <p className='productdisplay-right-category'><span>Tags:</span>Modern, Latest,Trending</p>

        </div>
      </div>
    </div>
  )
}

export default ProductDisplay
