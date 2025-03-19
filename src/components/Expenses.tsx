import React, { useEffect, useRef, useState } from "react";
import { useCartContext } from "../store/Context";

export default function Expenses() {
    const nameRef = useRef(null);
    const descRef = useRef(null);
    // const emailRef = useRef(null);
    // const { emailValue } = useCartContext();
    const [formdata, setFormdata] = useState([]); 
    const emailValue = localStorage.getItem("email")
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if ( !nameRef.current || !descRef.current) return;
  
      const productData = {
        email: emailValue,
        name: nameRef.current.value,
        description: descRef.current.value,
      };
  
      fetch("https://prod-shrap-default-rtdb.firebaseio.com/expenses.json", {
        method: "POST",
        body: JSON.stringify(productData),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((d) => {
          setFormdata([...formdata,d]) 
        });
        
    };
  
    useEffect(() => {
      fetch("https://prod-shrap-default-rtdb.firebaseio.com/expenses.json")
        .then((res) => res.json())
        .then((data) => {
          const foundData = data.filter((d) => d.email === emailValue);
          setFormdata(foundData || []); 
        });
    }, [emailValue]);
    const handleOnDelete=(e)=>{
      console.log(e.target.id);
      fetch(`https://prod-shrap-default-rtdb.firebaseio.com/expenses.json/${e.target.id}`,{
        method:'DELETE',
        headers: {
          "Content-type": "application/json",
        }
      }).then(res=>{
        if(!res.ok){
          throw Error("nothing to delete")
        }
        
        return res.json()
      }).then(d=>console.log(d)
      ).catch(error=>console.log(error)
      )
      setFormdata(formdata.filter(d=>d._id!==e.target.id))
    }
    return (
      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* <label htmlFor="email" className="text-gray-700">Email</label> */}
          {/* <input type="email" id="email" ref={emailRef} className="border p-2 rounded-md" /> */}
  
          <label htmlFor="name" className="text-gray-700">Product Name</label>
          <input type="text" id="name" ref={nameRef} className="border p-2 rounded-md" />
  
          <label htmlFor="desc" className="text-gray-700">Description</label>
          <input type="text" id="desc" ref={descRef} className="border p-2 rounded-md" />
  
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Submit
          </button>
        </form>
  
  
        {formdata.length !==0 ? (
          <div className="mt-4 p-4 border rounded-md bg-gray-100">
            <h2 className="text-lg font-semibold">Item Details</h2>
            {formdata.map(data=>(
              <>
              {/* <p><strong>Email:</strong> {data.email}</p> */}
            <p><strong>Product Name:</strong> {data.name}</p>
            <p><strong>Description:</strong> {data.description}</p>
            <button onClick={handleOnDelete} id={data._id}>Delete</button>
              </>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-red-500">No Item Found</p>
        )}
      </div>
    );
}
