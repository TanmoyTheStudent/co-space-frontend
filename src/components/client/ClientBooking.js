import { useState,useEffect } from "react"
import axios from "axios"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ClientOffCanvas from "./ClientOffCanvas"
import Rating from "./Rating"
import { FaStar } from "react-icons/fa"

function ClientBooking() {
  
  const [bookingInfo,setBookingInfo]=useState(null)
  const [reviewInfo,setReviewInfo]=useState(null)

 
  useEffect(()=>{

    if(localStorage.getItem('token')){

    (async()=>{
      try{
          const response= await axios.get("http://localhost:3033/api/bookings",{
                headers:{
                  Authorization: localStorage.getItem("token")
                }
            })
            console.log("bookings",response)
            setBookingInfo(response.data)
          
          //   const response2= await axios.get("http://localhost:3033/api/reviews/singleclient",{
          //     headers:{
          //       Authorization: localStorage.getItem("token")
          //     }
          // })
          // console.log("reviews",response2.data)
          // setReviewInfo(response2.data)
        }catch(err){
            console.log(err)
        }
      })();
    }

  },[])

  useEffect(()=>{

    if(localStorage.getItem('token')){

    (async()=>{
      try{
          // const response= await axios.get("http://localhost:3033/api/bookings",{
          //       headers:{
          //         Authorization: localStorage.getItem("token")
          //       }
          //   })
          //   console.log("bookings",response)
          //   setBookingInfo(response.data)
          
            const response2= await axios.get("http://localhost:3033/api/reviews/singleclient",{
              headers:{
                Authorization: localStorage.getItem("token")
              }
          })
          console.log("reviews",response2.data)
          setReviewInfo(response2.data)
        }catch(err){
            console.log(err)
        }
      })();
    }

  },[])

  //setting for off-canvas
  const [show,setShow]=useState(false)
  const handleShow=()=>{
          setShow(true)
  }
  const handleClose=()=>{
          setShow(false)
  }

//modal setup
    const [modal, setModal] = useState(false)
    const [editId, setEditId] = useState('')
    
    const toggle = () => {
        setModal(!modal)
    }
    
    const handleEdit = (id) => {
        setEditId(id)
        toggle()
    }

    const reviewUpdates=(obj)=>{
      console.log("obj in reviewUpdates",obj)
      const newReviews=reviewInfo.map(ele=>{
        if(ele._id!=obj._id){
          return ele
        }else{
          return obj
        }
      })
      setReviewInfo(newReviews)
    }

    const addReview=(obj)=>{
      const newReviews=[...reviewInfo,obj]
      setReviewInfo(newReviews)
    }

  //rating functions
  const handleRating=(ele)=>{
    handleEdit(ele.space._id)
  }


  return (
    <div className="row">
       
       <div className='col-2'  >
        <br/>
        <button className="btn btn-primary btn-sm" onClick={handleShow}>Client Functions</button>  
    </div>
   
   
   
   <div className='col-8 col-sm-8 col-md-6 col-lg-6 '>
    <h3>All Bookings</h3>
    <table className="table">
                <thead>
                    <tr>
                        <th>Sl. No.</th>
                        <th>BookType</th>
                        <th>Office Name</th>
                        <th>Space Category</th>
                        <th>Amount in Rs.</th>
                        <th>Booking Status</th>
                        <th>Reviews</th>
                    </tr>
                </thead>
                <tbody>
       {bookingInfo && reviewInfo &&
        bookingInfo.map((ele,i)=>{
          return(
            <tr key={i}>
              <td>{i+1}</td>
              <td> {ele.bookType}</td>
              <td>{ele.office.title}</td>
              <td>{ele.space.category.name}</td>
              <td>{ele.totalAmount}</td>
              <td>{ele.status}</td>
             
              <td>
              {
                reviewInfo.map(ele2=>ele2.space).includes(ele.space._id)?(
                  <>
                  {reviewInfo.find(ele3=>ele3.space===ele.space._id).rating} 
                  <FaStar 
                      color={"#ffc107"}
                       size={30}
                   />
                  <button className="btn btn-primary" onClick={(e)=>{handleRating(ele)}}>Update Rating</button>
                  </>
                ):(
                  <button className="btn btn-primary" onClick={(e)=>{handleRating(ele)}}>Rate the Space</button>
                )
              }
            </td>   
          </tr>  
           
          )
        })
       }
       </tbody>
       </table>
   </div>
      {console.log(bookingInfo)}
      {console.log(reviewInfo)}
  {/* off-canvas component */}
  <ClientOffCanvas show={show} handleClose={handleClose}/>

  {/* Modal setup */}
  <Modal isOpen={modal} toggle={toggle}>  
    <ModalHeader toggle={toggle}> Give Rating of this Space</ModalHeader>
    
    <ModalBody>
      <Rating editId={editId} toggle={toggle} reviewInfo={reviewInfo} reviewUpdates={reviewUpdates} addReview={addReview} />
    </ModalBody>
    
    <ModalFooter>  
        <Button color="light" onClick={toggle}>Cancel</Button>
    </ModalFooter>
</Modal>
      
      </div>
  )
}

export default ClientBooking