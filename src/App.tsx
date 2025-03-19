import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Auth from './authentication/Auth'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom'
import { useCartContext } from './store/Context'
import Layout from './Layout'
import Home from './components/Home'
import ProfileComplete from './components/ProfileComplete'

function App() {
  const {authChecker}=useCartContext()
  const [auth, setAuth] = useState(authChecker)
  useEffect(()=>{setAuth(authChecker)},[authChecker])
  const router=createBrowserRouter(createRoutesFromElements(<>
  <Route path='/auth' element={<Auth/>} />
  <Route path='/' element={auth ? <Layout/> : <Navigate to="/auth"/>} >
    <Route path="" element={<Home/>}/>
    <Route path='profile' element={<ProfileComplete/>}/>
  </Route>

  </>))

  return (
    <>
      <Auth/>
    </>
  )
}

export default App
