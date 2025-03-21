// import axios from 'axios'
// import { Eye, EyeOff } from 'lucide-react'
// import React, { useRef } from 'react'


// const API_KEY=import.meta.env.VITE_API_KEY || " ";

// export default function Auth() {
//     const refEmail= useRef("")
//     const [pass,setPass]=React.useState("")
//     const [passCheck,setPassCheck]=React.useState('')
//     const [error, setError]= React.useState('')
//     const [showPassword,setShowPassword] =React.useState(false)
//     const [isSignUp,setIsSignUp] =React.useState(true)
//     const [isLoading,setIsLoading] =React.useState(false)
//     const [passcheckfocus, setPasscheckfocus] = React.useState(false)
//     const [passfocus, setPassfocus] = React.useState(false)

//     const url=isSignUp
//     ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
//     : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
//     const handleOnSubmit=async(e)=>{
//         setIsLoading(true)
//         setError("")
//         e.preventDefault()
//         try {
//             const res= await axios.post(url,{
//                 email: refEmail.current.value,
//                 password:pass,
//                 returnSecureToken: true,
//             })
//             console.log("response data",res.data);
            

//         } catch (error) {
//             setError(error)
//         } finally{
//             setIsLoading(false)
//         }
//     }
//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

//     if(passfocus){
//         if(!passwordRegex.test(pass)){
//             setError("Password must be at least 8 characters long and contain both letters and numbers.");
//         }else{
//                 if(isSignUp){
//                     if(passCheck.length>0 && pass === passCheck){
//                         setError("")

//                     }else if(passCheck.length===0){
//                         setError("")
//                     }
//                     else{
//                         setError("pass not match")
//                     }
//                 }else{
//                     setError("")
//                 }
//             }
//     }
//     if(passcheckfocus){
//         if(!passwordRegex.test(passCheck)){
//             setError("Password must be at least 8 characters long and contain both letters and numbers.");}
//         else{
//             if(isSignUp){
//                 if(pass.length>0 && pass === passCheck){
//                     setError("")

//                 }else if(pass.length===0){
//                     setError("")
//                 }
//                 else{
//                     setError("pass not match")
//                 }
//             }else{
//                 setError("")
//             }
//         }
//     }
     


//   return (
//     <>
//     <form onSubmit={handleOnSubmit}>
//         <label htmlFor="email">email:</label>
//         <input type="email" name="email" id="email" ref={refEmail} required/>
//         <div className="relative w-64">
//             <label htmlFor="pass">Password:</label>
//       <input
//       onFocus={()=>setPassfocus(true)}
//       required
//       id='pass'
//       onChange={(e)=>setPass(e.target.value)}
//         type={showPassword ? "text" : "password"}
//         placeholder="Enter Password"
//         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       <button
//         type="button"
//         onClick={() => setShowPassword(!showPassword)}
//         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
//       >
//         {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//       </button>
//     </div>
//        {isSignUp && <div className="relative w-64">
//             <label htmlFor="passCheck">Confirm Pass</label>
//       <input
//       required
//       onFocus={()=>setPasscheckfocus(true)}
//       onChange={(e)=>setPassCheck(e.target.value)}
//       id='passCheck'
//         type={showPassword ? "text" : "password"}
//         placeholder="Enter Password"
//         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       <button
//         type="button"
//         onClick={() => setShowPassword(!showPassword)}
//         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
//       >
//         {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//       </button>
//     </div>}

//     {isLoading ? (
//             <p className="text-center text-gray-600">Processing...</p>
//           ) : (
//             <button
//               type="submit"
//               className="w-full py-3 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition duration-200"
//             >
//               {isSignUp ? 'Sign Up' : 'Sign In'}
//             </button>
//           )}
        
//     </form>
//     {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

//     <div className="mt-4 text-center">
//       <button
//         onClick={() => setIsSignUp(!isSignUp)}
//         className="text-sky-500 hover:underline text-sm"
//       >
//         {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
//       </button>
//     </div>
//     </>
//   )
// }


import axios from "axios";
import { Eye, EyeOff, Route } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { useCartContext } from "../store/Context";
import { replace, useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY || " ";

export default function Auth() {
  const navigate = useNavigate()
  const {authCheckerfun, authChecker}=useCartContext()
  const refEmail = useRef("");
  // const forgetRef = useRef("");
  const [pass, setPass] = useState("");
  const [passCheck, setPassCheck] = useState("");
  const [error, setError] = useState("");
  const [passerror, setPassError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isForget,setIsForget] = useState(false)
  
  const url = isSignUp
    ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
    : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

  // 🔹 Password Validation Regex
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // 🔹 Validate password and confirm password on change
  useEffect(() => {
    if (!pass){
        setPassError("")
        return};
    if (!passwordRegex.test(pass)) {
        setPassError("Password must be at least 8 characters long and contain both letters and numbers.");
        // setError("error")
        console.log(error);
    } else {
      setPassError("");
    }
  }, [pass]);

  useEffect(() => {
    
    if (isSignUp && passCheck && pass !== passCheck) {
      setError("Passwords do not match.");
    } else {
      setError("");
    }
  }, [passCheck, pass, isSignUp]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post(url, {
        email: refEmail.current.value,
        password: pass,
        returnSecureToken: true,
      });

      console.log("Response Data:", res.data);
      alert(isSignUp ? "Sign Up Successful!" : "Sign In Successful!");
      localStorage.setItem("email",refEmail.current.value)
      refEmail.current.value = "";
      setPass("");
      setPassCheck("");
      authCheckerfun(true)
      localStorage.setItem("idToken",res.data.idToken)
    } catch (err) {
      setError(err.response?.data?.error?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnForget =async ()=>{
    try {
      const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,{
        requestType:"PASSWORD_RESET",
        email:refEmail.current.value
      })
      console.log(res.data);
      alert("pelase check your email and reset password from there")
      navigate('/auth', {replace:true})
      setIsForget(false)
      setIsSignUp(true)
      refEmail.current.value=""
      
    } catch (error) {
      console.log(error);
      
    }
  }
  
  useEffect(()=>{
    if(authChecker){
      navigate('/', {replace:true})
    }
    
  },[authChecker,navigate])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleOnSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">{isSignUp ? "Sign Up" : "Sign In"}</h2>

        {/* 🔹 Email Input */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          ref={refEmail}
          required
          className="w-full px-4 py-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* 🔹 Password Input */}
        {!isForget && <div className="relative w-full">
          <label htmlFor="pass">Password:</label>
          <input
            required
            id="pass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {passerror && <p className="text-red-500 text-sm">{passerror}</p>}
        </div>}

        {/* 🔹 Confirm Password Input (Only for Sign-Up) */}
        {!isForget && isSignUp && (
          <div className="relative w-full mt-3">
            <label htmlFor="passCheck">Confirm Password:</label>
            <input
              required
              id="passCheck"
              value={passCheck}
              onChange={(e) => setPassCheck(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        )}
        
        {/* 🔹 Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* 🔹 Submit Button */}
        {!isForget && <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600 transition"
        >
          {isLoading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
        </button>}
      </form>
      {!isForget && !isSignUp && 
      <div className="mt-4 text-center">
      <button onClick={() => setIsForget(!isForget)} className="text-blue-500 hover:underline text-sm">
        Forget Password
      </button>
    </div>}
    {isForget && <>
   
    <button onClick={
      handleOnForget
    }>Forget</button>
    </>}

      {/* 🔹 Toggle Sign Up / Sign In */}
      {!isForget && <div className="mt-4 text-center">
        <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-500 hover:underline text-sm">
          {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
        </button>
      </div>}
    </div>
  );
}
