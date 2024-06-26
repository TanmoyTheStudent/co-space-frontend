import { useState,useReducer,useEffect } from "react"
import axios from "axios"
import AddAmenityForm from "./AddAmenityForm"
import AmenityTable from "./AmenityTable"
import AdminSidebar from "../AdminSidebar"
import amenitiesReducer from "../../../state-management/reducers/amenities-reducer"
import { AmenitiesContext } from "../../../state-management/context/root-context"

function AmenityContainer() {
  const [amenities,amenitiesDispatch] = useReducer(amenitiesReducer, { data: [], serverErrors: []})


  useEffect(()=>{
    if(localStorage.getItem('token')){

    (async()=>{
      try{
          const response= await axios.get("http://localhost:3033/api/amenities",{
                headers:{
                  Authorization: localStorage.getItem("token")
                }
            })
            amenitiesDispatch({ type: 'SET_AMENITIES', payload: response.data })
            //console.log("categories",response)
           // setAmenities(response.data)
        }catch(err){
            console.log(err)
        }
      })();
    }

  },[])

//   const addCategory = (category) => {
//     setCategories([...categories, category])
// }

// const removeCategory = (obj) => {
//     const newArr = categories.filter((ele) => {
//         return ele._id !== obj._id 
//     })
//     setCategories(newArr) 
// }

//console.log("categories",categories)

  return (
    <AmenitiesContext.Provider value={{ amenities, amenitiesDispatch }}>
    <div className="row">
      <div className='col-4 col-sm-2 col-md-2 col-lg-2 bg-danger' style={{height:'535px'}} >
        <AdminSidebar/>
   </div>

   <div className='col-8 col-sm-10 col-md-10 col-lg-8 p-5 '>
   { amenities &&
      <div className=" col-10 p-4" style={{ backgroundColor: '#FFFFE0' }}>
       <AddAmenityForm/>
      </div>
 }
      <br/><br/>

 { amenities &&
    <div>
      <h3 style={{textAlign:"center", marginBottom: '15px' }}>Amenities List-{" "}{amenities.length}</h3> 
        {amenities.length===0 ? <p style={{color:"red"}}>No categories please add categories</p> :(
           <AmenityTable  />
        )}
    </div>

  }  
      </div>   
    </div>
    </AmenitiesContext.Provider>
  )
}

export default AmenityContainer
