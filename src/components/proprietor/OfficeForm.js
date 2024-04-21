import { useState } from "react"
//import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { startCreateOffice } from "../../state-management/actions/offices-action" 
//import OfficeList from "./OfficeList"

function OfficeForm() {
    const dispatch = useDispatch()
    const serverErrors = useSelector((state) => {
        return state.offices.serverErrors
     })

        

    const [form, setForm] = useState({
        title: '',
        address:{
            houseNumber:0,
            street:"",
            city:"",
            state:"",
            country:"",
            pincode:0
        } ,
        capacity:0,
        description: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        if(name === "title" || name === "capacity" || name === "description"){
            setForm({...form, [name]: value })
        }else{
            setForm({ ...form, address: { ...form.address, [name]: value } })
        }
       
        //console.log(form)
    }

    //using es7-async await
    const handleSubmit=async (e)=>{
        e.preventDefault()
        console.log(form)

        const resetForm = () => {
            setForm({ 
                        title: '',
                address:{
                    houseNumber:0,
                    street:"",
                    city:"",
                    state:"",
                    country:"",
                    pincode:0
                } ,
                capacity:0,
                description: ''
            })
        }

        
        
        dispatch(startCreateOffice(form, resetForm))  
           
        

        // try{
        // const response= await axios.post('http://localhost:3033/api/offices/create',form,{
        //     headers:{
        //         Authorization:localStorage.getItem('token')}
        //     })
        
        //   console.log(response)
        //     alert('successfully registered in')
           
        //   //  props.loginSuccess() //
        // }catch(err){
        //     console.log(err)
        //     //setServerErrors(err.response.data.errors)
        // }
    }

  return (
    <div className="col-md-6 offset-md-3 " style={{marginTop: '100px'}}>
        <h4 className="text-center">Office Form</h4>
        <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="title"
                    >Name of the Office</label>
                    <input 
                        type="text" 
                        name="title"
                        id="title"
                        className="form-control"
                        value={form.officeName} 
                        onChange={handleChange}   
                    />
                </div>
                <h3>Address</h3>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="houseNumber"    
                    >House-number</label>
                    <input 
                        type="text" 
                        name="houseNumber" 
                        id="houseNumber"
                        className="form-control"
                        value={form.address.houseNumber} 
                        onChange={handleChange} 
                       
                    />
                </div>

                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="street"    
                    >Street</label>
                    <input 
                        type="text" 
                        name="street" 
                        id="street"
                        className="form-control"
                        value={form.address.street} 
                        onChange={handleChange} 
                       
                    />
                </div>

                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="city"    
                    >City</label>
                    <input 
                        type="text" 
                        name="city" 
                        id="city"
                        className="form-control"
                        value={form.address.city} 
                        onChange={handleChange} 
                       
                    />
                </div>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="state"    
                    >State</label>
                    <input 
                        type="text" 
                        name="state" 
                        id="state"
                        className="form-control"
                        value={form.address.state} 
                        onChange={handleChange} 
                       
                    />
                </div>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="country"    
                    >Country</label>
                    <input 
                        type="text" 
                        name="country" 
                        id="country"
                        className="form-control"
                        value={form.address.country} 
                        onChange={handleChange} 
                       
                    />
                </div>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="pincode"    
                    >Pincode</label>
                    <input 
                        type="text" 
                        name="pincode" 
                        id="pincode"
                        className="form-control"
                        value={form.address.pincode} 
                        onChange={handleChange} 
                       
                    />
                </div>
                <h3>Others</h3>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="capacity"    
                    >Capacity</label>
                    <input 
                        type="text" 
                        name="capacity" 
                        id="capacity"
                        className="form-control"
                        value={form.capacity} 
                        onChange={handleChange} 
                       
                    />
                </div>

                <div className="form-group">
                    <label
                        className="form-label"
                        htmlFor="description"
                    >Description</label>
                    <textarea
                        className="form-control"
                        value={form.description}
                        onChange={handleChange} 
                        name="description"
                        id="description"
                    >
                    </textarea>
                </div>
                <br/>
                <br/>
               
                <input type="submit" className="btn btn-primary" />
            </form>
{console.log(serverErrors) }
{/* <OfficeList/> */}
    </div>
  )
}
export default OfficeForm