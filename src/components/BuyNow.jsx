import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

export default function BuyNow({ user, setUser }){
  const { id } = useParams()
  const loc = useLocation()
  const navigate = useNavigate()
  const [product, setProduct] = useState(loc.state?.product || null)
  const [addr, setAddr] = useState(() => JSON.parse(localStorage.getItem('shop_address') || 'null'))
  const [form, setForm] = useState({ name: '', mobile: '', address: '' })

  useEffect(()=>{
    if(!product){
      import('./jsons/package.json').then(m=>{
        const list = m.default || m
        const p = list.find(x=>x.id===id)
        setProduct(p)
      })
    }
  },[id, product])

  function submitAddress(){
    if(!form.name || !form.mobile || !form.address){
      alert('plz fill your address form')
      return
    }
    localStorage.setItem('shop_address', JSON.stringify(form))
    setAddr(form)
  }

  function removeAddress(){
    localStorage.removeItem('shop_address')
    setAddr(null)
  }

  function pay(mode){
    if(mode==='cod'){
      alert('Your product purchase successfully (Cash on delivery)')
      navigate('/')
    } else if(mode==='online'){
      alert('Redirecting to payment gateway (demo)')
      // in real app integrate gateway; here we simulate success
      setTimeout(()=>{ alert('Payment successful') ; navigate('/') }, 800)
    } else {
      navigate(-1)
    }
  }

  if(!product) return <p>Loading...</p>

  return (
    <section className="buynow">
      <h2>Buy Now</h2>
      <div className="product-full">
        <img src={product.image} alt={product.title} />
        <div>
          <h3>{product.title}</h3>
          <div>Price: ₹{product.price}</div>
        </div>
      </div>

      <div className="address-section">
        {!addr ? (
          <form onSubmit={(e)=>{e.preventDefault(); submitAddress()}}>
            <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
            <input placeholder="Mobile" value={form.mobile} onChange={e=>setForm({...form, mobile: e.target.value})} />
            <textarea placeholder="Address" value={form.address} onChange={e=>setForm({...form, address: e.target.value})}></textarea>
            <button type="submit">Submit</button>
          </form>
        ) : (
          <div>
            <h4>Saved Address</h4>
            <div>{addr.name} - {addr.mobile}</div>
            <div>{addr.address}</div>
            <button onClick={removeAddress}>Remove</button>
            <button onClick={()=>{ setAddr(null) }}>Edit</button>
          </div>
        )}
      </div>

      <div className="payment-options">
        <h4>Payment</h4>
        <button onClick={()=>pay('cod')}>Cash on delivery</button>
        <button onClick={()=>pay('online')}>Online payment (demo)</button>
        <button onClick={()=>pay('cancel')}>Cancel</button>
      </div>
    </section>
  )
}
