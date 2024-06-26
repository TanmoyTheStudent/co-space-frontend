import axios from "axios"
import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddAmenityForm from "./AddAmenityForm";

function AmenityItem(props) {
    
    const [modal, setModal] = useState(false)
    const [editId, setEditId] = useState('')
    
    const toggle = () => {
        setModal(!modal)
    }
    
    const handleEdit = (id) => {
        setEditId(id)
        toggle()
    }

    const handleRemove=async ()=>{
        const confirmation=window.confirm('Are you sure?')
        if(confirmation){
           try{
            const response=await axios.delete(`http://localhost:3033/api/amenities/${props.amenity._id}`,{
                headers:{
                    Authorization:localStorage.getItem('token')}
                })
                props.amenitiesDispatch({ type: 'REMOVE_AMENITY', payload: response.data })
               // console.log(response.data)
                //props.removeCategory(response.data)
                //console.log(props.removeCategories(response.data))
           }catch(err){
                alert(err.message)
            }
        }
    }

   
  
    return (
    <>
        <tr>
            <td className="text-center">{props.index+1}</td>
            <td className="text-center">{props.amenity.amenityName}</td>
            <td className="text-center">{props.amenity.amenityCharge[0].price}</td>
            <td className="text-center">{props.amenity.amenityCharge[1].price}</td>
            <td className="text-center">{props.amenity.amenityCharge[2].price}</td>
            <td className="text-center">
                <button className="btn btn-sm btn-outline-warning" onClick={(e)=>{handleEdit(props.amenity._id)}} style={{ marginRight: '7px' }}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={handleRemove}>Remove</button>
            </td>
        </tr>

<Modal isOpen={modal} toggle={toggle}>  
    <ModalHeader toggle={toggle}> Edit Category</ModalHeader>
    
    <ModalBody>
        <AddAmenityForm editId={editId} toggle={toggle} />
    </ModalBody>
    
    <ModalFooter>  
        <Button color="light" onClick={toggle}>Cancel</Button>
    </ModalFooter>
</Modal>
</>
    
  )
}

export default AmenityItem