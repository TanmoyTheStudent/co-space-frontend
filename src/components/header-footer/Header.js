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

//make it responsive
/* <div>
<nav className="navbar navbar-expand-lg bg-warning">
  <div className="container">
    <div className="col-md-10">
      <Link className="navbar-brand mb-0 h3 p-5" to="/">Home</Link>
    </div>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/registration">Register</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</div> */