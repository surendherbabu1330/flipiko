import React from 'react'
import ProductCard from './ProductCard'

export default function OffersCarousel({ products }){
  // minimal carousel: horizontally scrolling set that auto-scrolls a bit via CSS animation
  return (
    <section className="offers">
      <h2>Top Offers</h2>
      <div className="offers-track">
        {products.map(p=> (
          <div key={p.id} className="offer-card" onClick={()=>{
            // navigate to product full-view by creating a full-screen overlay via location change
            const url = `/products#${p.id}`
            window.location.href = url
            // if you want SPA navigation use react-router's navigate in a more advanced version
          }}>
            <img src={p.image} alt={p.title} />
            <div>{p.title}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
