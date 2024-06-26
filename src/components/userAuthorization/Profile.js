import axios from "axios"
import { useState } from "react"
import { useAuth } from "../../state-management/context/AuthContext"
import { useNavigate } from "react-router-dom"

function Profile(props) {
    const {toggle}=props
    const {profile,handleProfile}=useAuth()
    const navigate=useNavigate()
    const[serverErrors,setServerErrors]=useState(null)
    const [form, setForm] = useState(!profile?({
        profileImage:null,
        documentPhoto:null,
        personalDetails:{
            fullName:"",
            fullAddress: "",
            occupation: "",
            purpose: "",
            documentType: "",
            documentNo: ""
            //documentPhoto:null
           }
        }): ({
            profileImage:profile.profileImage,
            documentPhoto:profile.personalDetails.documentPhoto,
            personalDetails:{
                fullName:profile.personalDetails.fullName,
                fullAddress: profile.personalDetails.fullAddress,
                occupation: profile.personalDetails.occupation,
                purpose: profile.personalDetails.purpose,
                documentType: profile.personalDetails.documentType,
                documentNo:profile.personalDetails.documentNo
                //documentPhoto:null
            }
        })
      
    )

    const handleChange = (e) => {
        const {name, value} = e.target
       if(name==="profileImage"||name==="documentPhoto"){
            setForm({...form,[name]:e.target.files[0]})
        }else{
            setForm({ ...form, personalDetails: { ...form.personalDetails, [name]: value } })
        }

        // else if(name==="documentPhoto"){
        //     setForm({ ...form, personalDetails: { ...form.personalDetails, [name]: e.target.files[0] } })
        // }
       
        //console.log(form)
        //console.log(e)
    }

    //using es7-async await
    const handleSubmit=async (e)=>{
        e.preventDefault()
        console.log(form)

        const resetForm = () => {
            setForm({ 
                profileImage:null,
                documentPhoto:null,
                personalDetails:{
                    fullName:"",
                    fullAddress: "",
                    occupation: "",
                    purpose: "",
                    documentType: "",
                    documentNo: ""
                    //documentPhoto:null
                   
                } 
            })
        }
  
           
        

        try{
            if(!profile){
                const response= await axios.post('http://localhost:3033/api/members',form,  {
                    headers:{
                        Authorization:localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data'}
                        
                }) 
               
                
                  console.log(response)
                    alert('successfully Profile created')
                    handleProfile(response.data)
            }else{
                const response= await axios.put('http://localhost:3033/api/members',form,  {
                    headers:{
                        Authorization:localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data'}
                        
                }) 
               
                
                  console.log(response)
                    alert('successfully Profile updated')
                    handleProfile(response.data)
            }
       
            resetForm()
            navigate("/profile-details")
            toggle()
           
          //  props.loginSuccess() //
        }catch(err){
            console.log(err)
            setServerErrors(err.response)
        }
    }

  return (
    <div className="col-md-6 offset-md-3 " style={{marginTop: '100px'}}>
        <h4 className="text-center">Profile/Membership Form</h4>
        <h6>It is necessary to complete for further actions like booking or adding office</h6>
        <form onSubmit={handleSubmit}>

            <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="profileImage"
                    >Upload your profile image</label>
                    <input 
                        type="file" 
                        name="profileImage"
                        id="profileImage"
                        className="form-control"
                       
                        onChange={handleChange}   
                    />
             </div>
            
            <h4>Personal Details</h4>
             <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="fullName"
                    >Full Name</label>
                    <input 
                        type="text" 
                        name="fullName"
                        id="fullName"
                        className="form-control"
                        value={form.personalDetails.fullName} 
                        onChange={handleChange}   
                    />
                </div>
            
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="fullAddress"    
                    >Full Address</label>
                    <input 
                        type="text" 
                        name="fullAddress" 
                        id="fullAddress"
                        className="form-control"
                        value={form.personalDetails.fullAddress} 
                        onChange={handleChange} 
                       
                    />
                </div>

                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="occupation"    
                    >Your Occupation</label>
                    <input 
                        type="text" 
                        name="occupation" 
                        id="occupation"
                        className="form-control"
                        value={form.personalDetails.occupation} 
                        onChange={handleChange} 
                       
                    />
                </div>

                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="purpose"    
                    >Your Purpose</label>
                    <input 
                        type="text" 
                        name="purpose" 
                        id="purpose"
                        className="form-control"
                        value={form.personalDetails.purpose} 
                        onChange={handleChange} 
                       
                    />
                </div>

                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="documentType"    
                    >Choose any of your document</label>
                    <input 
                        type="text" 
                        name="documentType" 
                        id="documentType"
                        className="form-control"
                        value={form.personalDetails.documentType} 
                        onChange={handleChange} 
                       
                    />
                </div>

                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="documentNo"    
                    >Document Number</label>
                    <input 
                        type="text" 
                        name="documentNo" 
                        id="documentNo"
                        className="form-control"
                        value={form.personalDetails.documentNo} 
                        onChange={handleChange} 
                       
                    />
                </div>

                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="documentPhoto"
                    >Upload the photo of your selected document</label>
                    <input 
                        type="file" 
                        name="documentPhoto"
                        id="documentPhoto"
                        className="form-control"
                       
                        onChange={handleChange}   
                    />
                </div>
                <br/>
                <br/>
               
                <input type="submit" className="btn btn-primary" />
            </form>

    
  {/* {console.log(serverErrors) }  */}
 
    </div>
  )
}

export default Profile