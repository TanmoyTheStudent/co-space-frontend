import { useEffect,useState } from "react"
import axios from "axios"
import { useParams,Link,useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'
import { startGetSingleSpace } from "../../state-management/actions/spaces-action"
import {startCreateBooking} from "../../state-management/actions/boookings-action"
import { useAuth } from "../../state-management/context/AuthContext"

import BookingSuccess from "../client/BookingSuccess"

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaStar } from "react-icons/fa"


function SpaceDetails(props) {

  const[show,setShow]=useState(false)
  const [alert,setAlert]=useState("")
    const { id1,id2 } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const{user,profile}=useAuth()
    const {offices}=props
  const[restOfAmenities,setRestOfAmenities]=useState(null)
  const [type,setType]=useState("")
  const [price,setPrice]=useState(0)
  const [quantity,setQuantity]=useState(1)
console.log("profile in spacedetails",profile)
    useEffect(() => {
        dispatch(startGetSingleSpace(id2))
    
      }, [dispatch])
  
    const data = useSelector((state) => {
        return state.spaces.singleData
     })
     console.log("single space",data)

     //review set-up
     const [reviewInfo,setReviewInfo]=useState(null)
     const [modal, setModal] = useState(false);
    
     
     useEffect(()=>{
      (async()=>{
        try{
            const response= await axios.get(`http://localhost:3033/api/reviews/${id2}`)
              console.log("reviews of a space",response)
              setReviewInfo(response.data)
          }catch(err){
              console.log(err)
          }
        })();
    },[])

    const toggle = () => {
        setModal(!modal)
      
    }

  
     //calculating available spaces
     //const[bookedSpace,setBookedSpace]=useState(0)
     const bookingOccured=()=>{
      let bookingSpace=0
      if(data._id){
           data.booking.forEach((ele,i) => {
            // console.log("looping",i,ele)
               if(new Date(ele.endingTime)>new Date()){
                 //console.log(i,true)
                 bookingSpace+=ele.quantity
                 console.log("booked",bookingSpace)
                
               }
           })
      }
      return bookingSpace
     }
    
     //setBookedSpace(x)

     const handleClick=async (type,price)=>{
     if(user){
        if(profile){
        // const response = await axios.get('http://localhost:3033/api/categories')
        // const amenities=response.data
        const office=offices.find((ele)=>ele._id==id1)
         console.log("1",office)
         console.log("2",office.availableAmenities)
         console.log("3",data.freeAmenities)
        // const otherAmenities=office.availableAmenities.filter((ele)=>{return !data.freeAmenities.includes(ele._id)})
        //console.log(otherAmenities)
        
          const paidAmenities1=office.availableAmenities.filter((ele)=>{return !data.freeAmenities.map((item)=>{
                   return item._id}).includes(ele._id)});
         const paidAmenities2= paidAmenities1.filter((ele)=>{
          return !data.paidAmenities.map((item)=>{return item.amenity}).includes(ele._id)});
          const otherAmenities=[...data.paidAmenities,...paidAmenities2]
         console.log("otherAmenities",otherAmenities)
         setRestOfAmenities(otherAmenities)
      
      

        setType(type)
        setPrice(price)
        setShow(true)
      }else{
          setAlert("First complete the profile Details")
      }
    }else{
      setAlert("please login and complete your profile details")
    }  


     }


     //checkbox-handling
     const [selectedExtraAmenities, setSelectedExtraAmenities] = useState([]);

     // Handle change of checkbox selection
     const handleCheckboxChange = (event) => {
       const value = event.target.value;
       // Toggle the selected option
       if (selectedExtraAmenities.includes(value)) {
         setSelectedExtraAmenities(selectedExtraAmenities.filter((option) => option !== value));
       } else {
         setSelectedExtraAmenities([...selectedExtraAmenities, value]);
       }
     }


     const handleConfirm=()=>{
     
        const formData={
          office: id1,
          space:id2,
          bookType:type,
          price:price,
          quantity:quantity,
          extraAmenities:selectedExtraAmenities
        }
        console.log("formData",formData)

        const reDirect=(data)=>{
          navigate("/booking-success",{ state: {bookingDetails:data} })
        }

        dispatch(startCreateBooking(formData,reDirect))
        setShow(false)
      
     }

  return (
    <div className="col-10 col-sm-10 col-md-12 col-lg-12  offset-1 " style={{marginTop: '100px', fontStyle:"italic"}}>
    {data.category &&
    <div className="row" >
      <div className="col-5 mt-3 bg-light p-3">
      <h4>Space Category-{data.category.name}</h4>
      <h5>Available Space-<span style={{color:"red"}}>{data.totalQuantity-bookingOccured()}</span></h5>
      <h5>Free Amenities--{data.freeAmenities.map((ele,i)=>{
                      return <li key={i}>{ele.amenityName}</li>
      })} 
      </h5>
      
      </div>
      <div className="col-5 offset-1">
          <h5>Image--</h5>
          <img src={`http://localhost:3033/${data.image}`} alt="SpaceImage" style={{height:"300px",width:"250px",border:"2px solid black"}}/>
          <h5>Average Rating-{data.avgRating}</h5>
          <h5 onClick={toggle} style={{color:"Highlight",cursor:"pointer"}}>Click here to see reviews</h5>
      </div>
    </div>
    }
      <br/>
      <br/>
      <h5>Types of bookings--</h5>
      <div className="container mt-5 " >  
        <div className="row">
      {
        Object.keys(data).length>0 && 
        data.bookingType.map((ele)=>{
            return(
                
            <div className=" col-sm-4 col-md-3 col-lg-3  mb-4" key={ele._id}>
            <div className="card bg-light">
            {/* <img src="https://via.placeholder.com/150" className="card-img-top" alt="..."> */}
            <div className="card-body">
            <h5 className="card-title">{ele.option}</h5>
            <p className="card-text">Price --{ele.price}</p>
            <br/>
            <button onClick={(e)=>{handleClick(ele.option,ele.price)}}>Book</button>
            </div>
            </div>
        </div>
        
        
            )
        })
    }
    </div>
    </div>

  <h4 style={{color:"red"}}>{alert}</h4>
{show && 
<div>
    <label >Quantity</label>
    <input 
      type="number"
      disabled={true}
      value={quantity}
    />
    <button 
      disabled={quantity>=5?true:false} 
      onClick={(e)=>{setQuantity(quantity+1)}} 
    >+1</button>
    <button 
      disabled={quantity==1?true:false} 
      onClick={(e)=>{setQuantity(quantity-1)}}
    >-1</button>

{restOfAmenities &&
  <div>
    <h4>Please select the required extra amenities</h4>
    {
       restOfAmenities.map((ele, index) => (
        <div key={index}>
         {
          ele.amenityCharge?(
         <div>
          <input
            type="checkbox"
            id={`option-${index}`}
            name="paidAmenities"
            value={ele._id}
             checked={selectedExtraAmenities.includes(ele._id)}
             onChange={handleCheckboxChange}
          />
          <label htmlFor={`option-${index}`}>{ele.amenityName}--Rs.{ele.amenityCharge.find((ele)=>ele.option===type).price}</label>
        </div>
        ) :(
          <div>
          <input
            type="checkbox"
            id={`option-${index}`}
            name="paidAmenities"
            value={ele.amenity}
             checked={selectedExtraAmenities.includes(ele.amenity)}
             onChange={handleCheckboxChange}
          />
          <label htmlFor={`option-${index}`}>{ele.amenityName}--Rs.{type==="daily"?ele.dailyPrice:(type==="weekly"?ele.weeklyPrice:ele.monthlyPrice)}</label>
        </div>
        )

      }
          <br/><br/>



        </div>
    ))}
    </div>
}
<button onClick={(e)=>{handleConfirm()}}>Book Confirm</button>
</div>
}

<Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}> Edit Product</ModalHeader>
        <ModalBody>
        {     
              reviewInfo &&
              reviewInfo.map((ele,i)=>{
                return(
                  <ul key={i}>
                    <h5>{i+1}.{ele.user.username}</h5>
                    rating--{ele.rating}
                    <FaStar 
                      color={"#ffc107"}
                       size={20}
                   />
                    <br/>
                    review--{ele.review?ele.review:"-"}
                  </ul>
                )
              })
            }
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal> 
    </div>
    //booking create
  )
}

export default SpaceDetails

//window.confirm
/* const userConfirm=window.confirm("Are you sure")
if(userConfirm){
    try{
        const response= await axios.delete(`http://localhost:3100/api/customers/${id}`)
        customerDispatch({ type: 'REMOVE_CUSTOMER', payload: response.data })
        navigate('/customers')
    }catch(err){

    }
}
}*/