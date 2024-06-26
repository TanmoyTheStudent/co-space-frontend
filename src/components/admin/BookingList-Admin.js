import { useState,useEffect } from "react"
import axios from "axios"
import AdminSidebar from "./AdminSidebar"

function BookingListAdmin() {
  
  const [bookingInfo,setBookingInfo]=useState(null)

 
  useEffect(()=>{

    if(localStorage.getItem('token')){

    (async()=>{
      try{
          const response= await axios.get("http://localhost:3033/api/bookings",{
                headers:{
                  Authorization: localStorage.getItem("token")
                }
            })
            //console.log("categories",response)
            setBookingInfo(response.data)
        }catch(err){
            console.log(err)
        }
      })();
    }

  },[])

  return (
    <div className="row">
       <div className='col-4 col-sm-2 col-md-2 col-lg-2 bg-danger' style={{height:'550px'}} >
      <AdminSidebar/>
   
   </div>
   <div className="col-8 col-sm-8 col-md-6 col-lg-6 " style={{marginTop: '50px',marginLeft:"50px"}}>
   <h3 style={{marginLeft:"200px",color:"Highlight"}}>All Bookings</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sl. No.</th>
                        <th>Booking Type</th>
                        <th>Office Name</th>
                        <th>Space Type</th>
                        <th>Total Amount(in Rs)</th>
                        <th>Booking Status</th>
                    </tr>
                </thead>
                <tbody>
                    { bookingInfo &&
                      bookingInfo.map((ele,i) => {
                        return (
                            <tr key={i}>
                                <td>{ i+1 }</td>
                                <td>{ele.bookType}</td>
                                <td>{ ele.office.title }</td>
                                <td>{ele.space.category.name}</td>
                                <td>{ele.totalAmount}</td>
                                <td>{ele.status}</td>
                             </tr>
                        )
                    }) }
                </tbody>
            </table>
    </div>
      {console.log(bookingInfo)}
      
      </div>
  )
}

export default BookingListAdmin