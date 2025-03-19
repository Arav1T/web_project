import axios from 'axios'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
const API_KEY= import.meta.env.VITE_API_KEY
export default function Home() {
    const emailRef=useRef("")
    const handlOnVrify=async()=>{
        try {
            const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,{
                requestType:"VERIFY_EMAIL",
                idToken:localStorage.getItem("idToken")
            })
            console.log(res.data);
            emailRef.current.value=""

        } catch (error) {
            
        }
    }
  return (
    <>
    <div className='flex justify-between'>
        <p className='bg'>Welcome to Expense</p>
        <div>
            Your Profile is incomplete
            <Link to="profile">Complete now</Link>
        </div>
    </div>

    <div>
        <label htmlFor="check">Vrify Your Email:</label>
        <input type="email" name="check" id="check" ref={emailRef} />
        <button onClick={handlOnVrify}>Vrify</button>
    </div>
    
    </>
  )
}
