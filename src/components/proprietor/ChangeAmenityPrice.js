
import { useState,useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { updateSpace } from "../../state-management/actions/spaces-action" 



function ChangeAmenityPrice(props) {
    const {amenity,space}=props
    const dispatch = useDispatch()
 

    const [amenityName,setAmenityName]=useState(amenity?(amenity.amenityCharge?amenity.amenityName:amenity.amenityName):"")
    const [dailyCharge,setDailyCharge]=useState(amenity?(amenity.amenityCharge?amenity.amenityCharge[0].price:amenity.dailyPrice):"")
    const [weeklyCharge,setWeeklyCharge]=useState(amenity?(amenity.amenityCharge?amenity.amenityCharge[1].price:amenity.weeklyPrice):"")
    const [monthlyCharge,setMonthlyCharge]=useState(amenity?(amenity.amenityCharge?amenity.amenityCharge[2].price:amenity.monthlyPrice):"")

    console.log("amenity in ChangeAmenityPrice.js",amenity)

const handleSubmit=async (e)=>{
        e.preventDefault()
        
        const formData={
            amenity:amenity.amenity,
            amenityName:amenityName,
            dailyPrice:parseFloat(dailyCharge),
            weeklyPrice:parseFloat(weeklyCharge),
            monthlyPrice:parseFloat(monthlyCharge)
            
        }

        console.log(formData)
    try{
    
            const response = await axios.put(`http://localhost:3033/api/spaces/${space._id}/paid-amenities`, formData,{
                headers:{
                    Authorization:localStorage.getItem('token')}
                }
            ) 
            console.log("response(space) in changeAmenityPrice.js ",response.data)
            dispatch(updateSpace(response.data))
        setAmenityName("")
        setDailyCharge("")
        setMonthlyCharge("")
        setWeeklyCharge("")
        props.toggle()
        props.toggle2()
      
        alert("sucessfully updated")
        //window.location.reload() 

        }catch(err){
            console.log(err)
            // if(err.response.data.errors && !props.editId){
            //      x.amenitiesDispatch({ type: "SET_ERRORS", payload: err.response.data.errors })
            // }else if(err.response.data.errors && props.editId){
            //     alert(err.response.data.errors.map((ele, i) => {
            //         return ele.msg
            //     }))
            // }else{
            //     alert(err.response.data.error)
            // }
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
{/* 
   { x.amenities.serverErrors.length > 0 && !props.editId && (
                <div style={{color:"red"}}>
                    <h2>This errors obstructing you from creating new amenity</h2>
                    <ul>
                        { x.amenities.serverErrors.map((ele, i) => {
                            return <li key={i}> {ele.msg} </li>
                        })}
                    </ul>
                </div>
            )} */}





   </>
  )
}

export default ChangeAmenityPrice