import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header({ user, setUser, products }){
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(e){
    e.preventDefault()
    navigate('/search', { state: { q: query } })
  }

  function logout(){
    localStorage.removeItem('shop_user')
    setUser(null)
    navigate('/auth')
  }

  return (
    <header className="header">
      <div className="logo" onClick={()=>navigate('/')}>MyShop</div>
      <form className="search" onSubmit={handleSearch}>
        <input placeholder="Search products..." value={query} onChange={e=>setQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <nav className="navlinks">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        {user ? (
          <>
            <span className="user">{user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/auth">Login / Signup</Link>
        )}
      </nav>
    </header>
  )
}
