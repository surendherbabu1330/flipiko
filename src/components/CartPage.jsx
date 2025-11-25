import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function CartPage(){
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('shop_cart') || '[]'))

  useEffect(()=>{ localStorage.setItem('shop_cart', JSON.stringify(cart)) },[cart])

  function changeQty(index, delta){
    const c = [...cart]
    c[index].qty += delta
    if(c[index].qty <= 0) c.splice(index,1)
    setCart(c)
  }

  function remove(index){
    const c = [...cart]
    c.splice(index,1)
    setCart(c)
  }

  const total = cart.reduce((s,i)=> s + i.price * i.qty, 0)

  return (
    <section className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-grid">
        <div className="left">
          {cart.length===0 && <p>Cart is empty</p>}
          {cart.map((it, idx)=> (
            <div className="cart-item" key={idx}>
              <img src={it.image} alt={it.title} />
              <div>
                <h4>{it.title}</h4>
                <div>Price: ₹{it.price}</div>
                <div className="qty">
                  <button onClick={()=>changeQty(idx,-1)}>-</button>
                  <span>{it.qty}</span>
                  <button onClick={()=>changeQty(idx,1)}>+</button>
                </div>
                <div className="item-total">₹{it.price * it.qty}</div>
                <div className="cart-actions">
                  <button onClick={()=>remove(idx)}>Remove</button>
                  <Link to={`/buynow/${it.id}`} state={{product: it}}>Buy now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <aside className="right">
          <h3>Summary</h3>
          <div>Total: ₹{total}</div>
        </aside>
      </div>
    </section>
  )
}

