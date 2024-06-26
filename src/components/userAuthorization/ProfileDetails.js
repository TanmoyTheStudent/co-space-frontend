import { useState } from "react"
import { useAuth } from "../../state-management/context/AuthContext"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Profile from "./Profile"
import OwnerOffCanvas from "../proprietor/OwnerOff-canvas"
 

function ProfileDetails() {
    const {user,profile,handleProfile}=useAuth()
    console.log("profile",profile)
    console.log("user",user)
    //const [editId, setEditId] = useState('')
    const [modal, setModal] = useState(false)
  const toggle = () => {
        setModal(!modal)
        //dispatch(setServerErrors([]))
    }

    const handleEdit=(e)=>{
      toggle()
    }
//setting for off-canvas
const [show,setShow]=useState(false)
const handleShow=()=>{
        setShow(true)
}
const handleClose=()=>{
        setShow(false)
}

  return (
    <>
      {/* button for off-canvas */}
<div className='col-1'  >
    <br/>
    <button className="btn btn-primary btn-sm" onClick={handleShow}>Owners Functions</button>  
</div>

    <div className="col-8 offset-1 mt-3">
      {profile &&
      <div>
      <h6>
        ProfileDetails-{profile.personalDetails.fullName}
        <br/>
        Full Address-{profile.personalDetails.fullAddress}
        <br/>
        ProfileImage:--
        <br/>
      </h6>
      <img src={`http://localhost:3033/${profile.profileImage}`} alt="ProfileImage" style={{height:"300px",width:"250px",border:"2px solid black"}}/>
      </div>
      }
      <br/>
      
  <button onClick={handleEdit}>Modify the profile information</button>

          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}> Edit Profile</ModalHeader>
            <ModalBody>
                <Profile  toggle={toggle} />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal> 
    </div>
    {user?(user.role==="proprietor"?<OwnerOffCanvas show={show} handleClose={handleClose}/>:null):null}
    </>
  )
}

export default ProfileDetails