import React from 'react'
import { useLocation } from 'react-router-dom'
import ProductCard from './AllProducts'

export default function SearchPage({ products }){
  const loc = useLocation()
  const q = (loc.state && loc.state.q) || ''
  const results = products.filter(p=> p.title.toLowerCase().includes(q.toLowerCase()))
  return (
    <section className="search-page">
      <h2>Search results for "{q}"</h2>
      <div className="grid">
        {results.length ? results.map(r=> <ProductCard key={r.id} product={r} />) : <p>No products found</p>}
      </div>
    </section>
  )
}
