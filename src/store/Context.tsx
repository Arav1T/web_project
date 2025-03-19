import { createContext, useContext, useState } from "react";

const CartContext=createContext({
    authChecker:false,
    authCheckerfun:()=>{}
})

export const useCartContext=()=>{
    return useContext(CartContext)
}

const CartProvider=({children})=>{
    const [authChecker,setAuthChecker] = useState(false)
    const authCheckerfun=(val)=>{
        setAuthChecker(val)
    }
    return (
        <CartContext.Provider value={{authChecker, authCheckerfun}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider