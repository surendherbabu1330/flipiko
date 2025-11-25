import React from 'react'
import OffersCarousel from './OffersCarousel'
import SectionScroller from './SectionScroller'

export default function Home({ products }){
  return (
    <main>
      <OffersCarousel products={products.filter(p=>p.offer)} />
      <SectionScroller title="Electronics" products={products.filter(p=>p.category==='electronics')} />
      <SectionScroller title="Men" products={products.filter(p=>p.category==='men')} />
      <SectionScroller title="Women" products={products.filter(p=>p.category==='women')} />
      <SectionScroller title="Mobiles" products={products.filter(p=>p.category==='mobiles')} />
      <SectionScroller title="Shoes" products={products.filter(p=>p.category==='shoes')} />

      <aside className="recent-right">
        <h3>Recently Clickable</h3>
        <p>Recently viewed product cards will appear here (demo shows static list)</p>
      </aside>

      <section className="about">
        <h2>About</h2>
        <p>Reviews & contact details</p>
        <address>
          MyShop Inc, 123 Market Street, City
        </address>
      </section>
    </main>
  )
}

