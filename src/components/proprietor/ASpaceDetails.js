import { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ChangeAmenityPrice from "./ChangeAmenityPrice"

function ASpaceDetails(props) {
    const{space,office,toggle}=props
    console.log("space in ASpaceDetails.js",space,"office in ASpaceDetails.js",office)
    
   //getting paid-amenities list
  // const [paidAmenities,setPaidAmenities]=useState([])
    // setPaidAmenities(otherAmenities) //use useEffect()
    const paidAmenities=()=>{
        let otherAmenities=[] 
   if(space && office){
        const paidAmenities1=office.availableAmenities.filter((ele)=>{return !space.freeAmenities.map((item)=>{
                 return item._id}).includes(ele._id)});
       const paidAmenities2= paidAmenities1.filter((ele)=>{
        return !space.paidAmenities.map((item)=>{return item.amenity}).includes(ele._id)});
        otherAmenities=[...space.paidAmenities,...paidAmenities2]
       console.log("otherAmenities",otherAmenities)
    }
    return otherAmenities
    } 

    //handle Amenity price
    
    const [modal, setModal] = useState(false)
    const[amenity,setAmenity]=useState(null)
    const toggle2 = () => {
        setModal(!modal)
        //dispatch(setServerErrors([]))
    }
    const handleAmenity=(ele)=>{
        toggle2()
        setAmenity(ele)
    }
   
  
   
  return (
    <div>
        {space && office &&
       <table className="table">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Information</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Space Type</th>
                    <td>{space.category.name}</td>
                </tr>
                <tr>
                    <th scope="row">Daily Price</th>
                    <td>{space.bookingType[0].price}</td>
                </tr>
                <tr>
                    <th scope="row">Weekly Price</th>
                    <td>{space.bookingType[1].price}</td>
                </tr>
                <tr>
                    <th scope="row">Monthly Price</th>
                    <td>{space.bookingType[2].price}</td>
                </tr>
                <tr>
                    <th scope="row">Total Quantity</th>
                    <td>{space.totalQuantity}</td>
                </tr>
                <tr>
                    <th scope="row">Image</th>
                    <td>{space.image}</td>
                </tr>
                <tr>
                    <th scope="row">Available Amenities</th>
                    <td>{office.availableAmenities.map((ele)=>{return <li>{ele.amenityName}</li>})}</td>
                </tr>
                <tr>
                    <th scope="row">Free Amenities</th>
                    <td>{space.freeAmenities.map((ele)=>{return <li>{ele.amenityName}</li>})}</td>
                </tr>
                <tr>
                    <th scope="row">Paid Amenities</th>
                    <td>
                        {paidAmenities()
                            .map((ele,i)=>{return(
                            <table className="table table-bordered table-hover table-info" key={i}>
                                    <thead >
                                        <tr>
                                        <th >Number</th>
                                        <th>Name</th>
                                        <th>Daily Price</th>
                                        <th>Weekly Price</th>
                                        <th>Monthly Price</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                            {
                                                ele.amenityCharge?(
                                                    <tr>
                                                    <td>{i+1}</td>
                                        <td>{ele.amenityName}</td>
                                        <td>{ele.amenityCharge[0].price}</td>
                                        <td>{ele.amenityCharge[1].price}</td>
                                        <td>{ele.amenityCharge[2].price}</td>
                                        <td>
                                            <button onClick={(e)=>{handleAmenity(ele)}}>Update Price</button>
                                        </td>
                                        </tr>
                                                ):(
                                                <tr>
                                                    <td>{i+1}</td>
                                        <td>{ele.amenityName}</td>
                                        <td>{ele.dailyPrice}</td>
                                        <td>{ele.weeklyPrice}</td>
                                        <td>{ele.monthlyPrice}</td>
                                        <td>
                                            <button onClick={(e)=>{handleAmenity(ele)}}>Update Price</button>
                                        </td>
                                        </tr>
                                                )
                                            }
                                        
                                       
                                    </tbody>
                             </table>)
                        
                    })}</td>
                </tr>

            </tbody>
        

       </table>
         
         }
           <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}> Edit Amenity Price</ModalHeader>
        <ModalBody>

            <ChangeAmenityPrice toggle={toggle} toggle2={toggle2} amenity={amenity} space={space} />
           
           
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal> 
    </div>
  )
}

export default ASpaceDetails