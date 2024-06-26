import { useState,useEffect } from "react"
//import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { startCreateSpace,startUpdateSpace } from "../../state-management/actions/spaces-action" 
import { startGetMyOffices } from "../../state-management/actions/offices-action"
import axios from "axios"
import OwnerOffCanvas from "./OwnerOff-canvas"
 


function SpaceForm(props) {
    //setting for off-canvas
    const [show,setShow]=useState(false)
    const handleShow=()=>{
            setShow(true)
    }
    const handleClose=()=>{
            setShow(false)
    }

//here we need the offices of a particular owner, not all the office
//const {offices}=props
const{space,editId,toggle}=props
const dispatch = useDispatch()
 
const myOffices = useSelector((state) => {
    return state.offices.data
 })
 console.log("myOffices in Space-form.js",myOffices) 
// const serverErrors = useSelector((state) => {
    //     return state.offices.serverErrors
    //  })

    const[categories,setCategories]=useState([])  
    const[selectedOffice,setSelectedOffice]=useState({}) 

    const [form, setForm] = useState(!space?{
        office: '',
        category:'',
        quantity:0,
        dailyPrice:0,
        weeklyPrice:0,
        monthlyPrice:0,
        image:null,
        freeAmenities:[]
        
    }:{
        office:space.office,
        category:space.category._id,
        quantity:space.totalQuantity,
        dailyPrice:space.bookingType[0].price,
        weeklyPrice:space.bookingType[1].price,
        monthlyPrice:space.bookingType[2].price,
        image:space.image,
        freeAmenities:space.freeAmenities
    })

useEffect(()=>{
    (async()=>{
        const response = await axios.get('http://localhost:3033/api/categories',{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        setCategories(response.data)
        console.log("categories",response.data)
      })(); 
      dispatch(startGetMyOffices())

},[])

    const handleChange = (e) => {
        const {name, value} = e.target
        
        if(name==="image"){
         setForm({...form,[name]:e.target.files[0]})
        }else if(name==="freeAmenities"){
            if (form.freeAmenities.includes(value)) {
                setForm({...form,[name]:form.freeAmenities.filter((option) => option !== value)});
              } else {
                setForm({...form,[name]:[...form.freeAmenities, value]});
                
              }
        }else{
            setForm({...form, [name]: value })
        }
       
        console.log(form)
    }

    useEffect(()=>{
        if( myOffices.length>0 && form.office!==""){
            const x=myOffices.find((ele)=>ele._id===form.office)
            setSelectedOffice(x)
            console.log("setting selected office in use-effect",x)
        }
    },[form.office,myOffices])
    

    //using es7-async await
    const handleSubmit=async (e)=>{
        e.preventDefault()
        //console.log(form)

        const formData={
            office: form.office,
            category: form.category,
            //image:String,
            bookingType:[{
                    option:"daily",
                    price:form.dailyPrice
                    },{
                        option:"weekly",
                        price:form.weeklyPrice
                        },{
                            option:"monthly",
                            price:form.monthlyPrice
                            }],
            totalQuantity:form.quantity,
            image:form.image,
            freeAmenities:form.freeAmenities
                        }

    console.log("formData",formData)

        const resetForm = () => {
            setForm({ 
                office: '',
                category:'',
                quantity:0,
                dailyPrice:0,
                weeklyPrice:0,
                monthlyPrice:0,
                image:null,
                freeAmenites:[]
            })
            setSelectedOffice({})  
        }

        
        
        
        
        if(space){
            console.log("editId",editId)
            dispatch(startUpdateSpace(editId,formData, resetForm,toggle)) 
        }else{
            dispatch(startCreateSpace(formData, resetForm)) 
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

//console.log("selected office",selectedOffice)
//console.log(offices) 

return (
    <>
     {/* button for off-canvas */}
     {!editId?(
     <div className='col-1'  >
        <br/>
        <button className="btn btn-primary btn-sm" onClick={handleShow}>Owners Functions</button>  
    </div>):null}

    {/* Space-Form Started */}

    {myOffices.length>0?(
    <div className="col-6 offset-2 " style={{marginTop: '100px'}}>
        <h4 className="text-center">Space creating Form</h4>
        <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="office"
                    >Select your Office</label>
                    {/* choose office from the list */}
                    <select 
                    id="office" 
                    name="office"
                    value={form.office} 
                    onChange={handleChange}
                    >
                    <option value="">Select...</option>
        {myOffices.map((office, index) => (
          <option key={index} value={office._id}>{office.title}</option>
        ))}
                    </select>
                    </div>

                    <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="category"
                    >Select Category</label>
                    {/* choose office from the list */}
                    <select 
                    id="category"
                    name="category"
                     value={form.category} 
                     onChange={handleChange}>
                    <option value="">Select...</option>
                   
        {categories.map((category, index) => (
          <option key={index} value={category._id}>{category.name}</option>
        ))}
                    </select>
                    </div>
                
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="quantity"    
                    >Quantity</label>
                    <input 
                        type="text" 
                        name="quantity" 
                        id="quantity"
                        className="form-control"
                        value={form.quantity} 
                        onChange={handleChange} 
                       
                    />
                </div>

                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="dailyPrice"    
                    >Daily Price</label>
                    <input 
                        type="text" 
                        name="dailyPrice" 
                        id="dailyPrice"
                        className="form-control"
                        value={form.dailyPrice} 
                        onChange={handleChange} 
                       
                    />
                </div>

                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="weeklyPrice"    
                    >Weekly Price</label>
                    <input 
                        type="text" 
                        name="weeklyPrice" 
                        id="weeklyPrice"
                        className="form-control"
                        value={form.weeklyPrice} 
                        onChange={handleChange} 
                       
                    />
                </div>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="monthlyPrice"    
                    >monthly Price</label>
                    <input 
                        type="text" 
                        name="monthlyPrice" 
                        id="monthlyPrice"
                        className="form-control"
                        value={form.monthlyPrice} 
                        onChange={handleChange} 
                       
                    />
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
                <h5>Select Free amenities under this space-category</h5>
                   
                   
        {selectedOffice.availableAmenities?(
        selectedOffice.availableAmenities.map((amenity, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={`option-${index}`}
            name="freeAmenities"
            value={amenity._id}
            checked={form.freeAmenities.includes(amenity._id)}
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

    </div>):null}

    <OwnerOffCanvas show={show} handleClose={handleClose}/>
    </>
  )
}
export default SpaceForm