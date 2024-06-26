import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
//import { useAuth } from '../../state-management/context/AuthContext'
import { Card, Row, Col } from 'react-bootstrap'
import HomeSidebar from './HomeSidebar'
import Pagination from './Pagination'

//searching
import { useDispatch,useSelector } from 'react-redux'
import { startGetOffices } from "../../state-management/actions/offices-action"

function Home(props) {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')

const{offices}=props
//const {user,profile}=useAuth()

useEffect(() => {
  // Fetch original data when the component mounts
 // dispatch(startGetOffices(''));

  // Clear search results when component unmounts
  return () => {
    setSearch('');
    dispatch(startGetOffices());
  };
}, [dispatch])

// handleChange
  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);

    // Invoke debounced search function
    handleSearch(value);
  }

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...arg) {
      console.log(arg)
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {func(arg[0])}, delay);
    };
  };

  // Function to handle searching
  const handleSearch = debounce((city) => {
    // Perform search operation using the search term
    console.log(city)
    dispatch(startGetOffices(city))
    // Here you can call your API or perform any other search operation
  }, 1000); // Adjust the delay as needed (e.g., 300 milliseconds)

//handling the button
const handleClick=(e)=>{
  dispatch(startGetOffices(search))
}

 // console.log("search in home",search)

 //pagination set-up
 const [currentPage, setCurrentPage] = useState(1);
 const [officesPerPage, setOfficesPerPage] = useState(1);
 const lastOfficeIndex = currentPage * officesPerPage;
 const firstOfficeIndex = lastOfficeIndex - officesPerPage;
 const currentOffices = offices.slice(firstOfficeIndex, lastOfficeIndex);

  return (
  <div className='row'>

       <div className='col-4 col-sm-2 col-md-2 col-lg-2 bg-danger' style={{height:'535px'}} >
     <HomeSidebar/>
    
    </div>

  <div className='col-6 col-sm-6 col-md-8 col-lg-8 '>
    <div className=' p-3 offset-2 bg-light' >
  <input
                type="text"
                placeholder="search city"
                value={search}
                onChange={handleChange}
            />{"   "}
     <button class="btn btn-primary" onClick={handleClick}>Search</button>
    </div>
            
{offices.length>0 &&
  
  <ul>
    { currentOffices.map((ele) => {
                
               return (
                

                   <div className='bg-light p-2 border-bottom border-dark' key={ele._id}>
                         
                    <Card>
                    <Card.Body>
                      <Row>
                        <Col className="col-3" style={{ backgroundColor: '#F8FFD4',textAlign:"center" }}>
                          {/* Content for the left part */}
                          <h4>Location</h4>
                          { ele.address.city }
                        </Col>
                        <Col>
                          {/* Content for the right part */}
                              Name of the Office-
                              <Link to={`/office-details/${ele._id}`}>{ ele.title}</Link>
                              <br/>
                                Address-
                                { ele.address.city }{" "}{ele.address.state}
                                <br/>
                                Capacity-
                                { ele.capacity }
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                                          
                        
                              </div>
                        )
                        
})}
                                        

                          </ul>
                          
}
<Pagination
        totalOffices={offices.length}
        officesPerPage={officesPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
/>
</div>
</div>

  )
}

export default Home