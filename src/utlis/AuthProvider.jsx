import { createContext, useState } from "react";

export const AuthContext = createContext(null)

export const AuthProvider = ({children}) =>{
    const [token, setToken] = useState(null)
    const [isVoted, setIsVoted] = useState(false)
    
    return(
        <AuthContext.Provider value={{token, setToken, isVoted, setIsVoted}}>
            {children}
        </AuthContext.Provider>
    )
}