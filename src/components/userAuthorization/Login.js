// Q1) what is localstorage? How to store something in localstorage?
//Q2)react-router-dom

import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../state-management/context/AuthContext'


const errorStyle={
    color:'red'
}

function Login() {
    const navigate = useNavigate()
    const {handleLogin,handleProfile}=useAuth()

  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')  
    const [formErrors, setFormErrors] = useState({})
    const [serverErrors, setServerErrors] = useState([]) 
    const errors={}

    const validateErrors=()=>{
        if(email.trim().length===0){
            errors.email="email is required"
        }

        if(password.trim().length===0){
            errors.password="password is needed"
        }else if(password.trim().length<8){
            errors.password="password can not be less than 8 characters"
        }
    }

    //using es7-async await
    const handleSubmit=async (e)=>{
      e.preventDefault()
      const FormData={
          email,
          password 
      }
      validateErrors()
      console.log(errors)

      if(Object.keys(errors).length===0){
      try{
      const response= await axios.post('http://localhost:3033/api/users/login',FormData)
      
        const token = response.data.token
        localStorage.setItem('token', token)
        console.log(localStorage)

        const userInfo= response.data.userInfo
        console.log(userInfo)
        handleLogin(userInfo)

        //profile-checking
        const profile = await axios.get('http://localhost:3033/api/members/view-profile', {
                 headers:{
                    Authorization:localStorage.getItem('token')
                  }
              })
      handleProfile(profile.data)
      

          alert('successfully logged in')
          setServerErrors("")
          setFormErrors({})
          setEmail('')
          setPassword("")

          if(userInfo.role==="admin"){
            navigate("/admin-dashboard")
          }else if(userInfo.role==="proprietor"){
            if(profile.data){
                navigate("/owner-dashboard")
            }else{
                navigate("/profile")
            }
           
          }else{
            navigate("/")
          }
          
         // props.loginSuccess()
      }catch(err){
        console.log(err)
        if(err.response.data.errors){
          setServerErrors(err.response.data.errors)
        }else{
            alert(err.response.data.error)
        }
          setFormErrors({})
      }
    }else{
        setFormErrors(errors)
    }
  }

  return (
    <div className="col-md-6 offset-md-3 offset-1 " style={{marginTop: '100px'}}>
        
        <h4 className="text-center">Login Form</h4>
        <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="email"    
                    >Email</label>
                    <input 
                        type="text" 
                        value={email} 
                        onChange={(e)=>{setEmail(e.target.value)}} 
                        name="email" 
                        id="email"
                        className="form-control"
                    />
                    {formErrors.email && <span style={errorStyle}>{formErrors.email}</span>}
                </div>
                <div className="form-group">
                    <label
                        className="form-label"
                        htmlFor="password"
                    >Password</label>
                    <input 
                        type="text" 
                         value={password} 
                        onChange={(e)=>{setPassword(e.target.value)}} 
                        name="password" 
                        id="password"
                        className="form-control"
                    />
                    {formErrors.password && <span style={errorStyle}>{formErrors.password}</span>}
                </div>
                <br/>
                {
                serverErrors.length > 0 &&  (
                    <div style={{color:"red"}}>
                        These errors prohibited the form from being logged in : 
                        <ul>
                            { serverErrors.map((ele, i) => {
                                return <li key={i}> { ele.msg }</li>
                            })}
                        </ul>
                    </div>
                )
            }
                <br/>

                <input type="submit" className="btn btn-primary" />
            </form>
            
    </div>
  )
}

export default Login


//login from expense app
/*
import { useState } from 'react'
import axios from 'axios'

export default function LoginForm(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')  
    const [formErrors, setFormErrors] = useState({})
    const [serverErrors, setServerErrors] = useState('') 

    //using es7-async await
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const FormData={
            email,
            password 
        }
        try{
        const response= await axios.post('http://localhost:3050/api/users/login',FormData)
        
            const token = response.data.token 
            localStorage.setItem('token', token)
            alert('successfully logged in')
            props.loginSuccess()
        }catch(err){
            setServerErrors(err.response.data.notice)
        }
    }

    //using es6-promise
    
    // const handleSubmit = (e) => {
    //        e.preventDefault()  
    //        const formData = {
    //            email,
    //            password 
    //        }
    //        axios.post('http://localhost:3050/api/users/login', formData)
    //            .then((response) => {
    //                const token = response.data.token 
    //                localStorage.setItem('token', token)
    //                alert('successfully logged in')
    //                props.loginSuccess()
    //            })
    //            .catch((err) => {
    //                setServerErrors(err.response.data.notice)
    //            })
    //     }
    return (
        <div>
            <h2>Login</h2>
            { serverErrors && <p style={{ color: 'red'}}>{ serverErrors }</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter Email</label> <br />
                <input 
                    type="text" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    id="email" 
                    name="email" 
                /> <br/>
                <label htmlFor="password">Enter Password</label> <br />
                <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} id="password" 
                    name="password" 
                /> <br/>
                <input type="submit" /> 
            </form>
        </div>
    )
}
*/