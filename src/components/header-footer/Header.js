import {Link} from "react-router-dom"

function Header() {
  return (
    <div >
   
   <nav className="navbar  bg-warning">
    
      <div className=" col-sm-6 col-md-8 col-lg-10">
                <Link className="navbar-brand mb-0 h3 p-5 " to="/" >Home</Link>
                </div> 
                <Link className="navbar-brand mb-0 h3" to="/login" >Login</Link>
            
                <Link className="navbar-brand mb-0 h3 " to="/registration">Register</Link>
            
      
    </nav>
  

    </div>

  )
}

export default Header

