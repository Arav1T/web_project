import { createContext, useContext, useState } from "react";

const CartContext=createContext({
    authChecker:true,
    authCheckerfun:()=>{}
})

export const useCartContext=()=>{
    return useContext(CartContext)
}

const CartProvider=({children})=>{
    const [authChecker,setAuthChecker] = useState(true)
    const authCheckerfun=()=>{
        setAuthChecker(false)
    }
    return (
        <CartContext.Provider value={{authChecker, authCheckerfun}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider