import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }){
  function addToCart(){
    const cart = JSON.parse(localStorage.getItem('shop_cart') || '[]')
    cart.push({ ...product, qty: 1 })
    localStorage.setItem('shop_cart', JSON.stringify(cart))
    alert('Added to cart')
  }

  return (
    <article className="product-card">
      <img src={product.image} alt={product.title} />
      <h4>{product.title}</h4>
      <div className="price">₹{product.price}</div>
      <div className="actions">
        <button onClick={addToCart}>Add to cart</button>
        <Link to={`/buynow/${product.id}`} state={{product}}>Buy now</Link>
      </div>
    </article>
  )
}
