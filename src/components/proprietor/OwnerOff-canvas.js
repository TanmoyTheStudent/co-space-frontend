import Offcavas from  "react-bootstrap/Offcanvas"
import { Link } from "react-router-dom"

function OwnerOffCanvas(props) {
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
                <Link to="/office-form" className="list-group-item  list-group-item-action p-2 text-danger">Add Office</Link>
                <Link to="/space-form" className="list-group-item list-group-item-action p-2 text-danger">Add Space</Link>
            </Offcavas.Body>
        </Offcavas>
    </div>
  )
}

export default OwnerOffCanvas


{/* <Offcavas show={show} onHide={handleClose} placement="start" backdrop={false} scroll={true} responsive="lg"> */}