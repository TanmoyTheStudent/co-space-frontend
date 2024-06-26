import {Link} from "react-router-dom"
import { useAuth } from "../../state-management/context/AuthContext"

function Header() {
  const {user,profile,handleLogout}=useAuth()
  return (
    <div >
   
   <nav className="navbar  bg-warning">
    
      <div className=" col-sm-4 col-md-6 col-lg-8">
          <Link className="navbar-brand mb-0 h3 p-5 " to="/" >Home</Link>
      </div> 
      {user && (
  <div>
    {profile && user.role === "proprietor" && (
      <Link className="navbar-brand mb-0 h3" to="/owner-dashboard">
        Owner Dashboard
      </Link>
    )}
    {profile && user.role === "user" && (
      <Link className="navbar-brand mb-0 h3" to="/client-dashboard">
        Client Dashboard
      </Link>
    )}
    {user.role === "admin" && (
      <Link className="navbar-brand mb-0 h3" to="/admin-dashboard">
        Admin Dashboard
      </Link>
    )}
  </div>
)}



   


      { !user? (
        <>
        <Link className="navbar-brand mb-0 h3" to="/login" >Login</Link>
            
        <Link className="navbar-brand mb-0 h3 " to="/registration">Register</Link>
      </>
      ):(
      <>
        <Link className="navbar-brand mb-0 h3" to="/account" >Account</Link>
            
        <Link 
        className="navbar-brand mb-0 h3 " 
        to="/" 
        onClick={(e)=>{
          localStorage.removeItem("token")
          handleLogout()
        }}
        >
          Logout
        </Link>
      </>
      )
      }
                
            
      
    </nav>
  

    </div>

  )
}

export default Header

