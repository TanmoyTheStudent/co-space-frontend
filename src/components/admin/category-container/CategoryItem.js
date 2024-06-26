import axios from "axios"
import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddCategoryForm from "./AddCategoryForm";

function CategoryItem(props) {
    
    //modal setup
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
            const response=await axios.delete(`http://localhost:3033/api/categories/${props.category._id}`,{
                headers:{
                    Authorization:localStorage.getItem('token')}
                })
               // console.log(response.data)
                props.removeCategory(response.data)
                //console.log(props.removeCategories(response.data))
           }catch(err){
                alert(err.message)
            }
        }
    }

    const date=(createDate)=>{
        const createdAt = new Date(createDate);
        const formattedDate = createdAt.toLocaleDateString();
        return formattedDate
    
    }
  
    return (
    <>
        <tr>
            <td className="text-center">{props.index+1}</td>
            <td className="text-center">{props.category.name}</td>
            <td className="text-center">{date(props.category.createdAt)}</td>
            <td className="text-center">
                <button className="btn btn-sm btn-outline-primary" onClick={(e)=>{handleEdit(props.category._id)}} style={{ marginRight: '7px' }}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={handleRemove}>Remove</button>
            </td>
        </tr>

<Modal isOpen={modal} toggle={toggle}>  
    <ModalHeader toggle={toggle}> Edit Category</ModalHeader>
    
    <ModalBody>
        <AddCategoryForm editId={editId} category={props.category} toggle={toggle} />
    </ModalBody>
    
    <ModalFooter>  
        <Button color="light" onClick={toggle}>Cancel</Button>
    </ModalFooter>
</Modal>
</>
    
  )
}

export default CategoryItem