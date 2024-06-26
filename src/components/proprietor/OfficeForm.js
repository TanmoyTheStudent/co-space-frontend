import { useState,useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { startCreateOffice,startUpdateOffice } from "../../state-management/actions/offices-action" 
//import OfficeList from "./OfficeList"
//import { useAuth } from "../../state-management/context/AuthContext"
import OwnerOffCanvas from "./OwnerOff-canvas"

function OfficeForm(props) {
    //setting for off-canvas
    const [show,setShow]=useState(false)
    const handleShow=()=>{
            setShow(true)
    }
    const handleClose=()=>{
            setShow(false)
    }
     // const {profile}=useAuth()
    //console.log(props)
    const dispatch = useDispatch()
    const serverErrors = useSelector((state) => {
        return state.offices.serverErrors
     })

   // console.log("serverErrors",serverErrors)

    const{myOffices,editId,toggle}=props
    const office=myOffices?myOffices.find(ele=>ele._id===editId) : null

//console.log("office in officeForm",office)

//Setting form info
    const [form, setForm] = useState(!office?{
        title:"",
        address:{
            houseNumber:0,
            street:"",
            city:"",
            state:"",
            country:"",
            postCode:0
        } ,
        capacity:0,
        description:"",
        image:null,
        availableAmenities:[]
    }:{
        title:office.title,
        address:{
            houseNumber:office.address.houseNumber,
            street:office.address.street,
            city:office.address.city,
            state:office.address.state,
            country:office.address.country,
            postCode:office.address.postCode
        } ,
        capacity:office.capacity,
        description: office.description,
        image:office.image,
        availableAmenities:office.availableAmenities
    })

   // console.log(form)
    //getting amenities from backend
    const[amenities,setAmenities]=useState([])

    useEffect(()=>{
        (async()=>{
            const response = await axios.get('http://localhost:3033/api/amenities',{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            setAmenities(response.data)
            console.log("amenities",response.data)
          })();  
    },[])

    const handleChange = (e) => {
        const {name, value} = e.target
        if(name === "title" || name === "capacity" || name === "description"){
            setForm({...form, [name]: value })
        }else if(name==="image"){
            setForm({...form,[name]:e.target.files[0]})
        }else if(name==="availableAmenities"){
            if (form.availableAmenities.includes(value)) {
                setForm({...form,[name]:form.availableAmenities.filter((option) => option !== value)});
              } else {
                setForm({...form,[name]:[...form.availableAmenities, value]});
              }
        }else{
            setForm({ ...form, address: { ...form.address, [name]: value } })
        }
       
        //console.log(form)
        //console.log(e)
    }

    //using es7-async await
    const handleSubmit=async (e)=>{
        e.preventDefault()
        console.log("form",form)

        const resetForm = () => {
            setForm({ 
                title: '',
                address:{
                    houseNumber:0,
                    street:"",
                    city:"",
                    state:"",
                    country:"",
                    postCode:0
                } ,
                capacity:0,
                description: '',
                image:null,
                availableAmenities:[]
            })
        }

        
        if(office){
            dispatch(startUpdateOffice(editId,form, resetForm,toggle)) 
           
        }else{
            dispatch(startCreateOffice(form, resetForm)) 
            
        }
         
          
        

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
    <>
    {/* button for off-canvas */}
    <div className='col-1'  >
        <br/>
        <button className="btn btn-primary btn-sm" onClick={handleShow}>Owners Functions</button>  
    </div>

    {/* Office-form started */}
    <div className="col-6 offset-2 " style={{marginTop: '100px'}}>
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
                    value={form.title} 
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
                >Area</label>
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
                    name="postCode" 
                    id="pincode"
                    className="form-control"
                    value={form.address.postCode} 
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

            <div className="form-group">
                <label 
                    className="form-label"
                    htmlFor="image"
                >Upload an image</label>
                <input 
                    type="file" 
                    name="image"
                    id="image"
                    className="form-control"
                   
                    onChange={handleChange}   
                />
            </div>

            <div >
                <h5>Select available amenities</h5>
                   
                   
        {amenities?(
        amenities.map((amenity, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={`option-${index}`}
            name="availableAmenities"
            value={amenity._id}
            checked={form.availableAmenities.includes(amenity._id)}
            onChange={handleChange}
          />
          <label htmlFor={`option-${index}`}>{amenity.amenityName}</label>
        </div>)
      )):null}
      
                    </div>

            <br/>
            <br/>
           
            <input type="submit" className="btn btn-primary" />
        </form>
{/* {console.log(serverErrors) } */}
{/* <OfficeList/> */}
</div>
<OwnerOffCanvas show={show} handleClose={handleClose}/>
{/* {profile?
    ():(<div>
    <h3 style={{color:"red"}}>First you have to update your profile</h3>
</div>)} */}
</> 
  )
}
export default OfficeForm