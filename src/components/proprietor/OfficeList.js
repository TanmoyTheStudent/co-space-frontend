import { useState,useEffect } from 'react' 
//import ProductForm from './ProductForm';
import { useDispatch,useSelector } from 'react-redux'
import { startGetOffices } from "../../state-management/actions/offices-action" 

//import { setServerErrors, startRemoveProduct } from '../actions/products-action';
//import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function OfficeList(props) {
    const dispatch = useDispatch()
    
    //dispatch(startGetOffices())

    useEffect(() => {
        dispatch(startGetOffices())
    
      }, [dispatch])

    const data = useSelector((state) => {
        return state.offices.data
     })
     console.log(data)


    // const [editId, setEditId] = useState('')
    // const [modal, setModal] = useState(false);
    // const {data} = props.products 

    // const toggle = () => {
    //     setModal(!modal)
    //     dispatch(setServerErrors([]))
    // }

    // const handleRemove = (id) => {
    //     const userConfirm = window.confirm("Are you sure?")
    //     if(userConfirm) {
    //         dispatch(startRemoveProduct(id))
    //     }
    // }

    // const handleEdit = (id) => {
    //     setEditId(id)
    //     toggle()
    // }

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
                    { data.map((ele) => {
                        return (
                            <tr key={ele._id}>
                                <td>{ ele.title}</td>
                                <td>{ ele.address.city }{" "}{ele.address.state}</td>
                                <td>{ ele.capacity }</td>
                                
                                <td>
                                        <button>show</button>
                                        <button >edit</button>
                                        <button >remove</button>

                                   
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
           
      {/* <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}> Edit Product</ModalHeader>
        <ModalBody>
            <ProductForm editId={editId} toggle={toggle} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal> */}
      
            </div>
    )
}


//dispatch(startGetOffices())-- if we do dispatch not inside a function or useEffect , then it will repeating itself(continuous re-rendering)