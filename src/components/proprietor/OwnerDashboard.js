//import { useState } from "react"
import { Link } from "react-router-dom"
//import OwnerOffCanvas from "./OwnerOff-canvas"

function OwnerDashboard() {
  //offcanvas settings
  // const [show,setShow]=useState(false)

  // const handleShow=()=>{
  //   setShow(true)
  // }

  // const handleClose=()=>{
  //   setShow(false)
  // }

  return (
    <>
      <div className='col-4 col-sm-2 col-md-2 col-lg-2 bg-danger' style={{height:'535px'}} >
          <Link to="/owner-dashboard" className="list-group-item list-group-item-action p-2 text-light">My Dashboard</Link>
          <Link to="/profile-details" className="list-group-item list-group-item-action p-2 text-light">My Profile</Link>
          <Link to="/my-offices" className="list-group-item list-group-item-action p-2 text-light">My Listed Offices</Link>
          <Link to="/office-form" className="list-group-item  list-group-item-action p-2 text-light">Add Office</Link>
          <Link to="/space-form" className="list-group-item list-group-item-action p-2 text-light">Add Space</Link>
          <Link to="/booking-lists" className="list-group-item list-group-item-action p-2 text-light">See Bookings</Link>
          


    </div> 

{/* <div className='col-4 col-sm-2 col-md-2 col-lg-2'  >
<br/>
<button className="btn btn-primary btn-sm" onClick={handleShow}>Owners Functions</button>  
</div> */}

<div className='col-8 col-sm-8 col-md-8 col-lg-8 '>
        <h4>Welcome Owner</h4>
</div>

{/* <OwnerOffCanvas show={show} handleClose={handleClose}/> */}
  
  </>
  )
}

export default OwnerDashboard