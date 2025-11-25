import React from 'react'
import ProductCard from "./AllProducts.jsx"

export default function AllProducts({ products }){
  return (
    <section className="all-products">
      <h2>All Products</h2>
      <div className="grid">
        {products.map(p=> <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}