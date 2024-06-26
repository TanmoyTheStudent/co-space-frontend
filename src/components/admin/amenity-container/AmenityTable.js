import { useContext } from "react"
import AmenityItem from "./AmenityItem"
import { AmenitiesContext } from "../../../state-management/context/root-context"


function AmenityTable() {
const {amenities,amenitiesDispatch}=useContext(AmenitiesContext)
  
  return (
    <div>
      {/* <table border={1}></table> */}

      <table className='table table-bordered table-responsive table-hover table-light'  >
            <thead className="table-danger">
                <tr>
                  <th className="text-center align-middle">Sl. No.</th>
                  <th className="text-center align-middle">Amenity Name</th>
                  <th className="text-center align-middle">Daily Rate</th>
                  <th className="text-center align-middle">Weekly Rate</th>
                  <th className="text-center align-middle">Monthly Rate</th>
                  <th className="text-center align-middle">Actions</th>
                </tr>
            </thead>
            <tbody >
                {
                    amenities.data.map((ele,i)=>{
                        return(
                            <AmenityItem 
                              key={i}
                              index={i}
                              amenity={ele}
                              amenitiesDispatch={amenitiesDispatch}
                            />
                        )
                    })
                }
       
            </tbody>
        </table>
    </div>
  )
}

export default AmenityTable