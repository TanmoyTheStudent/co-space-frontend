import { useState,useEffect } from 'react' 
//import ProductForm from './ProductForm';
import { useDispatch,useSelector } from 'react-redux'
import { startGetMyOffices,startSoftRemoveOffice } from "../../state-management/actions/offices-action" 
import { useParams,Link,useNavigate } from "react-router-dom"

//import { setServerErrors, startRemoveProduct } from '../actions/products-action';
import OfficeForm from './OfficeForm'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function MyOfficeList(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    //dispatch(startGetOffices()) --it will show error as it will keep fetching data

    useEffect(() => {
        dispatch(startGetMyOffices())
    
      }, [dispatch])

    const myOffices = useSelector((state) => {
        return state.offices.data
     })
     console.log("myOffices in officeList.js",myOffices)


    const [editId, setEditId] = useState('')
    const [modal, setModal] = useState(false);
    //const {data} = props.products 

    const toggle = () => {
        setModal(!modal)
        //dispatch(setServerErrors([]))
    }

      const handleEdit = (id) => {
        setEditId(id)
        toggle()
    }

    const handleRemove = (id) => {
        const userConfirm = window.confirm("Are you sure?")
        if(userConfirm) {
            dispatch(startSoftRemoveOffice(id))
        }
    }

  

     const handleShow=(id)=>{
        navigate(`/my-office/${id}`)
     }

    return (
        <div className="col-md-6 offset-md-3 " style={{marginTop: '100px'}}>
            <table className="table">
                <thead>
                    <tr>
                        <th>Office-Name</th>
                        <th>Address</th>
                        <th>Capacity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { myOffices.map((ele) => {
                        return (
                            <tr key={ele._id}>
                                <td>{ ele.title}</td>
                                <td>{ ele.address.city }{" "}{ele.address.state}</td>
                                <td>{ ele.capacity }</td>
                                
                                <td>
                                        <button onClick={(e)=>{handleShow(ele._id)}}>show</button>
                                        <button onClick={(() => {
                                            handleEdit(ele._id)
                                        })}>edit</button>
                                        <button onClick={() => {
                                            handleRemove(ele._id)
                                        }}>remove</button>

                                   
                                        {/* <button onClick={(() => {
                                            handleEdit(ele._id)
                                        })}>edit</button>
                                        <button onClick={() => {
                                            handleRemove(ele._id)
                                        }}>remove</button> */}
                                </td>
                             </tr>
                        )
                    }) }
                </tbody>
            </table>
           
     <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}> Edit Product</ModalHeader>
        <ModalBody>
            <OfficeForm myOffices={myOffices} editId={editId} toggle={toggle} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal> 
      
            </div>
    )
}


//dispatch(startGetOffices())-- if we do dispatch not inside a function or useEffect , then it will repeating itself(continuous re-rendering)