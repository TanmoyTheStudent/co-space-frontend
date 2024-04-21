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


