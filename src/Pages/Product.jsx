import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProduct from '../Components/RelatedProduct/RelatedProduct';


const Product = () => {
  
  const {productId} = useParams();
  const { product: products } = useContext(ShopContext);

  
  const selectedProduct = products.find((e)=> e.id === Number(productId));
   if (!selectedProduct) {
     return <div>Loading product...</div>;}
  return (
    <div>
      <Breadcrum product={selectedProduct}/>
      <ProductDisplay product={selectedProduct}/>
      <DescriptionBox/>
      <RelatedProduct/>
    </div>
  )
};

export default Product





