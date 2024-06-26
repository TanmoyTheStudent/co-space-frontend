import { useParams,Link } from "react-router-dom";
import { useEffect,useState } from "react";

import { useDispatch,useSelector } from 'react-redux'
import { startGetSpaces } from "../../state-management/actions/spaces-action"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SpaceForm from "./Space-form";
import ASpaceDetails from "./ASpaceDetails";

function MyOfficeDetails(props) {
    const { id } = useParams()
    const {offices}=props
    const dispatch = useDispatch()
console.log("all offices",offices)
    //getting office info
    const office= offices.find((ele)=>{
        return ele._id==id
       })

    console.log("office in MyOfficeDetails",office)

    //getting the spaces of that office
    useEffect(() => {
        dispatch(startGetSpaces(id))
    
      }, [dispatch])
    const spaces = useSelector((state) => {
        return state.spaces.data
     })
    console.log("all spaces of an office",spaces)

//modal set-up
const [editId, setEditId] = useState('')
const [click,setClick]=useState("")
const [modal, setModal] = useState(false);
const [space,setSpace]=useState({})

 const toggle = () => {
        setModal(!modal)
        //dispatch(setServerErrors([]))
    }
const handleShow=(id)=>{
    setClick("show")
    toggle()
    const desiredSpace=spaces.find(ele=>ele._id===id)
    setSpace(desiredSpace)
}

const handleEdit=(id)=>{
    setClick("edit")
    toggle()
    const desiredSpace=spaces.find(ele=>ele._id===id)
    setSpace(desiredSpace)
    setEditId(id)
}

const handleRemove=(id)=>{

}

  return (
    <div>MyOfficeDetails
         {office &&
       <table className="table">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Information</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Name of the Office</th>
                    <td>{office.title}</td>
                </tr>
                <tr>
                    <th scope="row">Address of the Office</th>
                    <td>{office.address.houseNumber},{office.address.street},{office.address.city}</td>
                </tr>
                <tr>
                    <th scope="row">Total Capacity</th>
                    <td>{office.capacity}</td>
                </tr>
            </tbody>
        

       </table>
         
         }
        {!office && offices && <h3 style={{color:"red"}}> Your office is not approved yet by the admin </h3>}
        <br/>
        <br/>
        <h3>Spaces under this office</h3>
        {spaces.length>0 &&
        <table className="table">
        <thead>
            <tr>
                <th>Space-Name</th>
                
                <th>Capacity</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            { spaces.map((ele) => {
                return (
                    <tr key={ele._id}>
                        <td>{ ele.category.name}</td>
                        
                        <td>{ ele.totalQuantity }</td>
                        
                        <td>
                                    <button onClick={(e)=>{handleShow(ele._id)}}>show</button>
                                     <button onClick={(() => {
                                            handleEdit(ele._id)
                                             })}>edit</button>
                                    <button onClick={() => {
                                         handleRemove(ele._id)
                                         }}>remove</button> 

                           
                        </td>
                     </tr>
                )
            }) }
        </tbody>
    </table>
        }

        <div>
       
  <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}> Edit Space</ModalHeader>
        <ModalBody>
            {
                click==="show"?(
                   <ASpaceDetails space={space} office={office} toggle={toggle} />
                ):(click==="edit"? <SpaceForm space={space} editId={editId} toggle={toggle} />:null)
            }
           
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal> 
        </div>
    </div>
  )
}

export default MyOfficeDetails