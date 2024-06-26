import ClientOffCanvas from "./ClientOffCanvas"
import { useState } from "react"
 
function ClientDashboard() {

   //setting for off-canvas
   const [show,setShow]=useState(false)
   const handleShow=()=>{
           setShow(true)
   }
   const handleClose=()=>{
           setShow(false)
   }

  return (
    <div className="row">
      <div className='col-2'  >
      <br/>
      <button className="btn btn-primary btn-sm" onClick={handleShow}>Client Functions</button>  
      </div>
      <div className="col-8">
         <h2>ClientDashboard</h2> 
      </div>

      {/* off-canvas component */}
      <ClientOffCanvas show={show} handleClose={handleClose}/>
    </div>
  )
}

export default ClientDashboard