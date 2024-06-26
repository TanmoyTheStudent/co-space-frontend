import { createContext,useContext,useState } from "react"

const AuthContext=createContext()

export const useAuth=()=>{
    return useContext(AuthContext)
}

export const AuthProvider=(props)=>{
    const [user,setUser]=useState(null)
    const [profile,setProfile]=useState(null)

    const handleLogin=(user)=>{
        setUser(user)
    }

    const handleProfile=(profile)=>{
        setProfile(profile)
        console.log("useAuth",profile)
    }

    const handleLogout=()=>{
        setUser(null)
        setProfile(null)
    }

    return(
        <AuthContext.Provider value={{user,profile,handleLogin,handleLogout,handleProfile}}>
            {props.children}
        </AuthContext.Provider>
    )
}

