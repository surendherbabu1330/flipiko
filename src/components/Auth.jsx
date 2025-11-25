import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Auth({ setUser }){
  const [isLogin, setLogin] = useState(true)
  const [form, setForm] = useState({ name:'', email:'', password:'' })
  const nav = useNavigate()

  function signup(e){
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('shop_users') || '[]')
    if(users.find(u=>u.email===form.email)){
      alert('you are exist user plz just login')
      return
    }
    users.push({ name: form.name, email: form.email, password: form.password })
    localStorage.setItem('shop_users', JSON.stringify(users))
    alert('successfully sign')
    localStorage.setItem('shop_user', JSON.stringify({ name: form.name, email: form.email }))
    setUser({ name: form.name, email: form.email })
    nav('/')
  }

  function login(e){
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('shop_users') || '[]')
    const u = users.find(u=> u.email===form.email && u.password===form.password)
    if(!u){ alert('fist sing in plz'); return }
    localStorage.setItem('shop_user', JSON.stringify({ name: u.name, email: u.email }))
    setUser({ name: u.name, email: u.email })
    nav('/')
  }

  return (
    <section className="auth">
      <div className="tabs">
        <button onClick={()=>setLogin(true)}>Login</button>
        <button onClick={()=>setLogin(false)}>Signup</button>
      </div>
      {isLogin ? (
        <form onSubmit={login}>
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
          <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <form onSubmit={signup}>
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
          <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />
          <button type="submit">Submit</button>
        </form>
      )}
    </section>
  )
}
