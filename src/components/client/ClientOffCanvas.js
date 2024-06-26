import Offcavas from  "react-bootstrap/Offcanvas"
import { Link } from "react-router-dom"

function ClientOffCanvas(props) {
    const {show,handleClose}=props
  return (
    <div>
        <Offcavas show={show} onHide={handleClose} placement="start"> 
            <Offcavas.Header closeButton>
                <Offcavas.Title>Owners Functions</Offcavas.Title>
            </Offcavas.Header>
            <Offcavas.Body>
                <Link to="/owner-dashboard" className="list-group-item list-group-item-action p-2 text-danger">My Dashboard</Link>
                <Link to="/profile-details" className="list-group-item list-group-item-action p-2 text-danger">My Profile</Link>
                <Link to="/client-booking" className="list-group-item list-group-item-action p-2 text-danger">My Booking</Link>
                <Link to="/wishlist" className="list-group-item  list-group-item-action p-2 text-danger">My Wishlist</Link>
            </Offcavas.Body>
        </Offcavas>
    </div>
  )
}

export default ClientOffCanvas


{/* <Offcavas show={show} onHide={handleClose} placement="start" backdrop={false} scroll={true} responsive="lg"> */}