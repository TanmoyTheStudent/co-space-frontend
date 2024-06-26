import { Link } from "react-router-dom"

function AdminSidebar() {
  return (
    <div>
         <Link to="/admin-dashboard" className="list-group-item list-group-item-action p-2 text-light">My Dashboard</Link>
        <Link to="/add-category" className="list-group-item  list-group-item-action p-2 text-light">Add Category</Link>
        <Link to="/add-amenity" className="list-group-item list-group-item-action p-2 text-light">Add Amenity</Link>
        <Link to="/admin-approve" className="list-group-item list-group-item-action p-2 text-light">Approve Functions</Link>
        <Link to="/admin-delete" className="list-group-item list-group-item-action p-2 text-light">Delete Functions</Link>
        <Link to="/admin-booking-list" className="list-group-item list-group-item-action p-2 text-light">All Bookings</Link>
        <Link to="/admin-chart" className="list-group-item list-group-item-action p-2 text-light">See Chart</Link>

            
    </div>
  )
}

export default AdminSidebar