import { useParams,Link } from "react-router-dom";
import { useEffect,useState } from "react";

import { useDispatch,useSelector } from 'react-redux'
import { startGetSpaces } from "../../state-management/actions/spaces-action"

import { useAuth } from "../../state-management/context/AuthContext";

//map inclusion
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import { Icon, divIcon, point } from "leaflet";


function OfficeDetails(props) {
    const { id } = useParams()
    const {offices}=props
    const {user}=useAuth()

    const dispatch = useDispatch()
    
  //dispatch(startGetOffices())
//here we should aquire data only for the spaces related to that office, but for now all spaceswe are acquiring

  useEffect(() => {
      dispatch(startGetSpaces(id))
  
    }, [dispatch])

  const spaces = useSelector((state) => {
      return state.spaces.data
   })
   console.log("all spaces of an office",spaces)

   //get the total offices as a props , and filter it on the basis of paramsid,

   const office= offices.find((ele)=>{
    return ele._id==id
   })
console.log("office in OfficeDetails",office)

//spaces related to this office id

// const spaces= data.filter((ele)=>{
//     return ele.office==id
//    })

//console.log("spaces in spaceDetails",spaces)


const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: require("../images/placeHolder.png"),
  iconSize: [38, 38] // size of the icon
});

  return (
    <div>
     
      {office &&
        <div className="row">
          <div className="col-md-7 offset-1 mt-3 bg-secondary p-5">
            <h4>Name of the Office- {office.title}</h4>
            <h5>Address-{office.address.houseNumber},{office.address.street},{office.address.city}</h5>
            <h5>Total Capacity-{office.capacity}</h5>
            <h5>Available Amenities--{office.availableAmenities.map((ele,i)=>{
                      return <li key={i}>{ele.amenityName}</li>
      })} 
      </h5>
          </div>
  
          {user?(
          <div className="col-md-4 mt-3 d-flex align-items-center justify-content-center flex-column">
              <h5>{office.title} Picture</h5>
              <img src={`http://localhost:3033/${office.image}`} alt="OfficeImage" style={{height:"300px",width:"250px",border:"2px solid black"}}/>
          </div>):null}
          
          </div>
}
      

        <div className="container mt-5 " >  
        <div className="row">
    { spaces.length>0 && 
        spaces.map((ele)=>{
            return(
                
              <div className="col-md-3 mb-4" key={ele._id}>
              <div className="card bg-light">
              <img src={`http://localhost:3033/${ele.image}`} className="card-img-top" alt="..."/>
              <div className="card-body">
              <h5 className="card-title">{ele.category.name}</h5>
              <p className="card-text">Available--{ele.totalQuantity}</p>
            <br/>
            <Link to={`/office/${id}/space/${ele._id}`}>Show More...</Link>
            </div>
            </div>
        </div>
        
        
            )
        })
    }
    </div> 
    </div>

    
    <br/>
    
    <h5 style={{textAlign:"center",color:"red"}}>Location in Map:-</h5>
    
{user?(
   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      
      
   <MapContainer center={[office.location.latitude,office.location.longitude]} zoom={13} style={{ height: '400px',width:"400px", border: '2px solid black',bottom:"50px" }}>
   
               <TileLayer
                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />

           <Marker position={[office.location.latitude,office.location.longitude]} icon={customIcon}>
               <Popup>{office.title}</Popup>
             </Marker>
    </MapContainer>
    </div>

):(<h5 style={{color:"red"}}>Login to see more</h5>)}
   
    </div>
  )
}

export default OfficeDetails


//icon link--https://www.flaticon.com/free-icon/pin_2377874?term=placeholder&related_id=2377874