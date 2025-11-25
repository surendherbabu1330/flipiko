import React, { useState } from 'react'
import ProductCard from './ProductCard'

export default function SectionScroller({ title, products }){
  const [expanded, setExpanded] = useState(null) // id of expanded product
  const [showAll, setShowAll] = useState(false)

  return (
    <section className="section-scroller">
      <div className="section-header">
        <h3>{title}</h3>
        <button onClick={()=>setShowAll(s=>!s)}>{showAll? 'Hide' : 'Show all ' + title}</button>
      </div>

      <div className={`cards ${showAll? 'all-visible': ''}`}>
        {products.map(p=> (
          <div key={p.id} className={`card-wrapper ${expanded===p.id? 'expanded': ''}`} onDoubleClick={()=>setExpanded(p.id)}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  )
}
