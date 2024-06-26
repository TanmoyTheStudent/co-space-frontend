//import { Link } from "react-router-dom"
import AdminSidebar from "./AdminSidebar"

function AdminDashboard() {
  return (
    <>
    <div className='col-4 col-sm-2 col-md-2 col-lg-2 bg-danger' style={{height:'550px'}} >
      <AdminSidebar/>
   
   </div>
   
   <div className='col-8 col-sm-8 col-md-8 col-lg-8 '>
       <h4>Welcome Admin</h4>
   </div>
   </>
  )
}

export default AdminDashboard