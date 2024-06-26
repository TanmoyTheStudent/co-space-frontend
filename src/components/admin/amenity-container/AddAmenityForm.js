//import { Link } from "react-router-dom"
import { useState,useContext,useEffect } from "react"
import axios from "axios"
//import AdminSidebar from "../AdminSidebar"
import { AmenitiesContext } from "../../../state-management/context/root-context"


function AddAmenityForm(props) {
    const x=useContext(AmenitiesContext)
    //console.log(x)
    
    const amenity= x.amenities.data.find(ele => ele._id == props.editId)

    const [amenityName,setAmenityName]=useState(amenity?amenity.amenityName:"")
    const [dailyCharge,setDailyCharge]=useState(amenity?amenity.amenityCharge[0].price:"")
    const [weeklyCharge,setWeeklyCharge]=useState(amenity?amenity.amenityCharge[1].price:"")
    const [monthlyCharge,setMonthlyCharge]=useState(amenity?amenity.amenityCharge[2].price:"")

    

const handleSubmit=async (e)=>{
        e.preventDefault()
        
        const formData={
            amenityName:amenityName,
            amenityCharge:[{
                    option:"daily",
                    price:parseFloat(dailyCharge)
                },
                {
                    option:"weekly",
                    price:parseFloat(weeklyCharge)
                },
                {
                    option:"monthly",
                    price:parseFloat(monthlyCharge)
                }]
        }

        console.log(formData)
    try{
        if(amenity) {
            const response = await axios.put(`http://localhost:3033/api/amenities/${amenity._id}`, formData,{
                headers:{
                    Authorization:localStorage.getItem('token')}
                }
            ) 
            x.amenitiesDispatch({ type: 'UPDATE_AMENITY', payload: response.data })
            props.toggle()
        }else{
            const response= await axios.post("http://localhost:3033/api/amenities",formData,{
                headers:{
                    Authorization:localStorage.getItem('token')}
                })
            console.log(response)
            x.amenitiesDispatch({ type: 'ADD_AMENITY', payload: response.data })
        }

        x.amenitiesDispatch({ type: "SET_ERRORS", payload: []})
        setAmenityName("")
        setDailyCharge("")
        setMonthlyCharge("")
        setWeeklyCharge("")
       

        }catch(err){
            console.log(err)
            if(err.response.data.errors && !props.editId){
                 x.amenitiesDispatch({ type: "SET_ERRORS", payload: err.response.data.errors })
            }else if(err.response.data.errors && props.editId){
                alert(err.response.data.errors.map((ele, i) => {
                    return ele.msg
                }))
            }else{
                alert(err.response.data.error)
            }
        }
        
    }

  return (
    <>
   
   <div className='col-12 col-sm-12 col-md-10 col-lg-8 p-2' style={{marginLeft:"50px"}} >
       <h4 className="text-center"> Amenity Form</h4>
       <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="amenityName"
                    >Enter the amenity name</label>
                    <input 
                        type="text" 
                        name="amenityName"
                        id="amenityName"
                        className="form-control"
                        value={amenityName} 
                        onChange={(e)=>{setAmenityName(e.target.value)}}   
                    />
                </div>

                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="dailyCharge"
                    >Add daily charge of the amenity</label>
                    <input 
                        type="number" 
                        name="dailyCharge"
                        id="dailyCharge"
                        className="form-control"
                        value={dailyCharge} 
                        onChange={(e)=>{setDailyCharge(e.target.value)}}   
                    />
                </div>

                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="weeklyCharge"
                    >Add weekly charge of the amenity</label>
                    <input 
                        type="number" 
                        name="weeklyCharge"
                        id="weeklyCharge"
                        className="form-control"
                        value={weeklyCharge} 
                        onChange={(e)=>{setWeeklyCharge(e.target.value)}}   
                    />
                </div>

                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="monthlyCharge"
                    >Add monthly charge of the amenity</label>
                    <input 
                        type="number" 
                        name="monthlyCharge"
                        id="monthlyCharge"
                        className="form-control"
                        value={monthlyCharge} 
                        onChange={(e)=>{setMonthlyCharge(e.target.value)}}   
                    />
                </div>
                
                
                <br/>
               
                 <input type="submit" className="btn btn-warning "  style={{marginLeft:"80%"}}/>
               
           </form>
   </div>

   { x.amenities.serverErrors.length > 0 && !props.editId && (
                <div style={{color:"red"}}>
                    <h2>This errors obstructing you from creating new amenity</h2>
                    <ul>
                        { x.amenities.serverErrors.map((ele, i) => {
                            return <li key={i}> {ele.msg} </li>
                        })}
                    </ul>
                </div>
            )}





   </>
  )
}

export default AddAmenityForm