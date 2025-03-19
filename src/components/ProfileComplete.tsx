import axios from 'axios'
import React, { useEffect, useRef } from 'react'
const API_KEY = import.meta.env.VITE_API_KEY || " ";
export default function ProfileComplete() {
    const nameRef=useRef("")
    const urlRef=useRef("")
    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const res =await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,{idToken:localStorage.getItem("idToken")})
                console.log(res.data);
                nameRef.current.value=res.data.users[0].displayName
                urlRef.current.value=res.data.users[0].photoUrl
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchData()

    },[])
    const handleOnSubmit =async(e)=>{
        e.preventDefault()
        try {
            const res= await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,{
                idToken:localStorage.getItem("idToken"),
                displayName:nameRef.current.value,
                photoUrl:urlRef.current.value,
                deleteAttribute:[],
                returnSecureToken: true

            })
            console.log("response", res.data);
            nameRef.current.value=""
            urlRef.current.value=""
            
        } catch (error) {
            console.log("error",error);
            
        }
    }

  return (
    <>
    <form onSubmit={handleOnSubmit}>
        <label htmlFor="uname">NewUserName:</label>
        <input type="text" name="uname" id="uname" ref={nameRef} />
        <label htmlFor='url'>URL:</label>
        <input type="url" name="url" id="url" ref={urlRef} />
        <button>Update</button>
    </form>

    </>
  )
}
