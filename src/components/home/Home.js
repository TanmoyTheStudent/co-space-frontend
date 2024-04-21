import React from 'react'
import { Link } from 'react-router-dom'
function Home() {
  return (
  
       <div className='col-4 col-sm-2 col-md-2 col-lg-2 bg-danger' style={{height:'500px'}} >
      <Link to="/" className="list-group-item list-group-item-action p-2 text-light">Home</Link>
      <Link to="/about" className="list-group-item  list-group-item-action p-2 text-light">About</Link>
      <Link to="/services" className="list-group-item list-group-item-action p-2 text-light">Services</Link>
      <Link to="/contact" className="list-group-item list-group-item-action p-2 text-light">Contact</Link>
    
    </div>
  )
}

export default Home