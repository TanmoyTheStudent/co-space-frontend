import React from 'react'
import { useLocation } from 'react-router-dom';
import { Card,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

function BookingSuccess() {
  const location = useLocation();
  const {bookingDetails} = location.state || {};
 

  const makePayment = async()=>{
            try{
                const body = {
                    bookingId:bookingDetails._id,
                   // productName:product.productName,
                    amount:bookingDetails.totalAmount
                }

                console.log("body in makePayment",body)
                
            const response = await axios.post('http://localhost:3033/api/create-checkout-session',body)

            console.log("response from check-out-session",response)
            
            //Store the transaction id in local storage
            localStorage.setItem('stripeId', response.data.id)
            
            //Redirecting the user to the chekout page of stripe
            window.location = response.data.url; 
    
            }catch(err){
                console.log(err)
            }
        }
 
  return (
   
    <div>
      <h4>Booking Initiated...please pay now to confirm</h4>
        <br/>
        <div  style={{
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center',
            flexDirection: 'column'
        }}>  
       
        <div  className="col-md-4 mb-3">
        <Card>
           
          <Card.Body>
            <Card.Title>Booking id- {bookingDetails._id}</Card.Title>
            <Card.Text>{bookingDetails.totalAmount}</Card.Text>
            <Button variant="primary" onClick={(e)=>{
                makePayment()
            }}>
              Pay Now
            </Button>
          </Card.Body>
        </Card>
      </div>
    
      </div>
      {console.log("booking details",bookingDetails)}
    </div>)
}
     


  

export default BookingSuccess

// import {useState , useEffect} from 'react'
// import { Card,Button} from 'react-bootstrap';
// import axios from 'axios'
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function BookingSuccess () {
//     const [invoices,setInvoice] = useState([])

//     useEffect(()=>{
//         (async()=>{
//             try{
//                 const response =await axios.get('http://localhost:3033/api/invoices')
//                 setInvoice(response.data)
//             }catch(err){
//                 console.log(err)
//             }
//         })()
//     },[])
    
//     const makePayment = async(product)=>{
//         try{
//             const body = {
//                 invoiceId:product._id,
//                 productName:product.productName,
//                 amount:product.amount
//             }
            
//         const response = await axios.post('http://localhost:3033/api/create-checkout-session',body)
        
//         //Store the transaction id in local storage
//         localStorage.setItem('stripeId', response.data.id)
        
//         //Redirecting the user to the chekout page of stripe
//         window.location = response.data.url; 

//         }catch(err){
//             console.log(err)
//         }
//     }

//     return (
//     <div>
//       <h4>Booking Initiated...please pay now to confirm</h4>
//         <br/>
//         <div  style={{
//             display: 'flex',
//             justifyContent: 'center', 
//             alignItems: 'center',
//             flexDirection: 'column'
//         }}>  
//         <h1>Listing Invoices - {invoices.length}</h1>
//         {invoices.map(product => (
//         <div key={product._id} className="col-md-4 mb-3">
//         <Card>
//           <Card.Img variant="top" src={product.image} style={{ height: '200px' }} />
//           <Card.Body>
//             <Card.Title>{product.productName}</Card.Title>
//             <Card.Text>{product.amount}</Card.Text>
//             <Button variant="primary" onClick={(e)=>{
//                 makePayment(product)
//             }}>
//               Pay Now
//             </Button>
//           </Card.Body>
//         </Card>
//       </div>
//       ))}
//       </div>
//     </div>)
// }