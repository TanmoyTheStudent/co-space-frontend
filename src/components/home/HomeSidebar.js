import { Link } from "react-router-dom"
import { useAuth } from '../../state-management/context/AuthContext'

function HomeSidebar() {
    const {user,profile}=useAuth()
  return (
    <div>
         <Link to="/" className="list-group-item list-group-item-action p-2 text-light">Home</Link>
      {user && !profile ?(<Link to="/profile" className="list-group-item list-group-item-action p-2 text-light">Add Profile</Link>):null}

      <Link to="/about" className="list-group-item  list-group-item-action p-2 text-light">About</Link>
      <Link to="/services" className="list-group-item list-group-item-action p-2 text-light">Services</Link>
      <Link to="/contact" className="list-group-item list-group-item-action p-2 text-light">Contact</Link>
    </div>
  )
}

export default HomeSidebar