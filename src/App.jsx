import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import SearchPage from './components/SearchPage'
import AllProducts from './components/AllProducts'
import CartPage from './components/CartPage'
import BuyNow from 'c:/Users/hp/Desktop/flipiko/src/components/Buynow'
import Auth from './components/Auth'

export default function App(){
  const [products, setProducts] = useState([])
  const [user, setUser] = useState(() => {
    try{ return JSON.parse(localStorage.getItem('shop_user')) }catch(e){return null}
  })

  useEffect(()=>{
    // dynamic fetch from local JSON file
    fetch('/src/components/jsons/package.json')
      .then(r=>r.json())
      .then(data=>setProducts(data))
      .catch(_=>{
        // fallback static import if fetch blocked
        import('./components/jsons/package.json').then(m=>setProducts(m.default || m))
      })
  },[])

  useEffect(()=>{ if(user) localStorage.setItem('shop_user', JSON.stringify(user)) },[user])

  return (
    <div>
      <Header user={user} setUser={setUser} products={products} />
      <Routes>
        <Route path='/' element={<Home products={products} />} />
        <Route path='/search' element={<SearchPage products={products} />} />
        <Route path='/products' element={<AllProducts products={products} />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/buynow/:id' element={<BuyNow user={user} setUser={setUser} />} />
        <Route path='/auth' element={<Auth setUser={setUser} />} />
      </Routes>
    </div>
  )
}

