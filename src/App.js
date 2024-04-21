import { Route,Routes } from "react-router-dom";

import Registration from "./components/userAuthorization/Registration";
import Login from "./components/userAuthorization/Login";
import Header from "./components/header-footer/Header";
import Home from "./components/home/Home";

import OfficeForm from "./components/proprietor/OfficeForm";
import OfficeList from "./components/proprietor/OfficeList";


function App() {

  
  return (
    <div className='row'>
      
      <Header/>
     <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />}/>
        <Route path="/registration" element={<Registration />} />
        <Route path="/office-form" element={<OfficeForm />} />
        <Route path="/office-list" element={<OfficeList />} />
       
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