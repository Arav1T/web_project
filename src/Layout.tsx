import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useCartContext } from './store/Context'

export default function Layout() {
    const {authCheckerfun}=useCartContext()
    const navigate=useNavigate()
    const handleOnLogout=()=>{
authCheckerfun(false)
localStorage.removeItem("idToken")
navigate('/auth',{replace:true})
    }
  return (
    <div>
        <h1>Header</h1>
        <button onClick={handleOnLogout}>LogOut</button>
        <Outlet/>


    </div>
  )
}
