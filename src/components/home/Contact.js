import HomeSidebar from "./HomeSidebar";

function Contact() {
  return (
    <div className='row'>

    <div className='col-4 col-sm-2 col-md-2 col-lg-2 bg-danger' style={{height:'535px'}} >
  <HomeSidebar/>
 
 </div>

<div className='col-6 col-sm-6 col-md-8 col-lg-8 '>
<div className=' p-3 offset-2 bg-light' >
    <div className="card" style={{ width: '25rem', margin: '10px' }}>
      <div className="card-body">
        <h5 className="card-title">Co-Space</h5>
        <p className="card-text">
          Email: email.com <br />
          Phone: 123456789
        </p>
      
      </div>
    </div>
    </div>
  </div>
  </div>
  );
}

export default Contact;
