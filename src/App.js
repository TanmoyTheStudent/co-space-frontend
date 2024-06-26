import axios from "axios";
import { Route,Routes,useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react' 
import { useDispatch,useSelector } from 'react-redux'
import { startGetOffices } from "./state-management/actions/offices-action"


//useAuth to store user after login
import { useAuth } from "./state-management/context/AuthContext";


//importing components

//Home
import Home from "./components/home/Home";
import Header from "./components/header-footer/Header";
import OfficeDetails from "./components/home/OfficeDetails";
import SpaceDetails from "./components/home/SpaceDetails";
import Contact from "./components/home/Contact";
import About from "./components/home/About";
import Services from "./components/home/Services";

//Authorizaton-related
import Registration from "./components/userAuthorization/Registration";
import Login from "./components/userAuthorization/Login";
import Account from "./components/userAuthorization/Account";
import Profile from "./components/userAuthorization/Profile";
import ProfileDetails from "./components/userAuthorization/ProfileDetails";


//dashboard
import AdminDashboard from "./components/admin/AdminDashboard";
import OwnerDashboard from "./components/proprietor/OwnerDashboard";
import ClientDashboard from "./components/client/ClientDashboard";

//admin-related
import CategoryContainer from "./components/admin/category-container/CategoryContainer";
import AmenityContainer from "./components/admin/amenity-container/AmenityContainer";
import BookingListAdmin from "./components/admin/BookingList-Admin";
import AdminChart from "./components/admin/AdminChart";
import AdminApproval from "./components/admin/AdminApproval";
import AdminDelete from "./components/admin/AdminDelete";

//Owner related
import OfficeForm from "./components/proprietor/OfficeForm";
import SpaceForm from "./components/proprietor/Space-form";
import MyOfficeDetails from "./components/proprietor/MyOfficeDetails";
import MyOfficeList from "./components/proprietor/MyOfficeList";
import BookingLists from "./components/proprietor/BookingLists";

//client related
import ClientBooking from "./components/client/ClientBooking";
import ClientWishlist from "./components/client/ClientWishlist";

//payment
import Success from "./components/client/payment/Success";
import Cancel from "./components/client/payment/Cancel";
import BookingSuccess from "./components/client/BookingSuccess";

//private-route
import PrivateRoute from "./components/PrivateRoute";
import Unauthorized from "./components/Unauthorized";



function App() {
  const navigate=useNavigate()
//getting all offices
  const dispatch = useDispatch()
    
  //dispatch(startGetOffices())

  useEffect(() => {
      dispatch(startGetOffices())
  
    }, [dispatch])

  const offices = useSelector((state) => {
      return state.offices.allOffices
   })
   
   //console.log(offices)

//setting the user in useAuth() during re-loading
const {handleLogin,handleProfile}=useAuth()

useEffect(()=>{
  if(localStorage.getItem('token')){
    (async()=>{
      try{
      const response = await axios.get('http://localhost:3033/api/users/account', {
                 headers:{
                    Authorization:localStorage.getItem('token')
                  }
              })
      handleLogin(response.data)
      console.log("users set at useEffect in App.js ",response.data)
    }catch(error){
      if (error.response && error.response.data.error === "jwt expired") {
        console.log("Token expired for user account request.",error);
        localStorage.removeItem('token');
        // Redirect to login or show a message
        navigate("/login")
      } else {
        console.log("An error occurred while fetching user account:", error);
      }
    }

    }
  )();

    (async()=>{
      try{
      const response = await axios.get('http://localhost:3033/api/members/view-profile', {
                 headers:{
                    Authorization:localStorage.getItem('token')
                  }
              })
      handleProfile(response.data)
      console.log("profile set at useEffect in App.js ",response.data)
    }catch(error){
      if (error.response && error.response.data.error === "jwt expired") {
        console.log("Token expired for user account request.",error);
        localStorage.removeItem('token');
        // Redirect to login or show a message
        navigate("/login")
      } else {
        console.log("An error occurred while fetching user account:", error);
      }
    }
  })();
  }
},[])
 

  return (
    <div className='row'>
      
      <Header/>
     <Routes>
      {/* Home-related */}
        <Route path="/" element={<Home offices={offices} />} />
        <Route path="/office-details/:id" element={<OfficeDetails offices={offices} />} />
        <Route path="/office/:id1/space/:id2" element={<SpaceDetails offices={offices}/>} />
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/services" element={<Services />}/>


        {/* Authorization-related */}
        <Route path="/login" element={<Login />}/>
        <Route path="/registration" element={<Registration />} />
        <Route path="/account" element={<PrivateRoute permittedRoles={['admin','user','proprietor']}>
                                          <Account/>
                                        </PrivateRoute>}/>
        <Route path="/profile" element={<PrivateRoute permittedRoles={['admin','user','proprietor']}>
                                          <Profile/>
                                       </PrivateRoute>}/>
        <Route path="/profile-details" element={<PrivateRoute permittedRoles={['admin','user','proprietor']}>
                                           <ProfileDetails/>
                                         </PrivateRoute>}/>
       

      {/* dashboard */}
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="/owner-dashboard" element={<OwnerDashboard/>}/>
        <Route path="/client-dashboard" element={<ClientDashboard/>}/>

        {/* Admin-related */}
        <Route path="/add-category" element={<PrivateRoute permittedRoles={['admin']}>
                                            <CategoryContainer/>
                                         </PrivateRoute>}/>
        <Route path="/add-amenity" element={<AmenityContainer/>}/>
        <Route path="/admin-booking-list" element={<BookingListAdmin/>}/>
        <Route path="/admin-chart" element={<AdminChart/>}/>
        <Route path="/admin-approve" element={<PrivateRoute permittedRoles={['admin']}>
                                              <AdminApproval/>
                                         </PrivateRoute>}/>
                                         
         <Route path="/admin-delete" element={<PrivateRoute permittedRoles={['admin']}>
                                              <AdminDelete/>
                                         </PrivateRoute>}/>                               
                                         

        {/* Owner-related */}
        <Route path="/space-form" element={<SpaceForm offices={offices}/>} />
        <Route path="/office-form" element={<OfficeForm  />} />
        <Route path="/my-offices" element={<MyOfficeList />} /> 
        <Route path="/my-office/:id" element={<MyOfficeDetails offices={offices}/>} /> 
        <Route path="/booking-lists" element={<BookingLists/>}/>

        {/* Clent related */}
        <Route path="/client-booking" element={<ClientBooking/>}/>
        <Route path="/wishlist" element={<ClientWishlist/>}/>


         {/* payment-related */}
         <Route path="/booking-success" element={<BookingSuccess/>} />
        <Route path="/payment-success" element={<Success/>}/>
        <Route path="/payment-failed" element={<Cancel/>}/>

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized/>}/>
     </Routes>
    
    
     
    </div>
  );
}

export default App;


// import React, { useState } from 'react';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// function App() {
//   const [modal, setModal] = useState(false);

//   const toggle = () => setModal(!modal);

//   return (
//     <div>
//       <Button color="danger" onClick={toggle}>
//         Click Me
//       </Button>
//       <Modal isOpen={modal} toggle={toggle} >
//         <ModalHeader toggle={toggle}>Modal title</ModalHeader>
//         <ModalBody>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat. Duis aute irure dolor in
//           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//           culpa qui officia deserunt mollit anim id est laborum.
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={toggle}>
//             Do Something
//           </Button>{' '}
//           <Button color="secondary" onClick={toggle}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// }

// export default App;