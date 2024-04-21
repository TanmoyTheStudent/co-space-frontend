//Q)  know about es6 and es7 features of js(link: https://www.programiz.com/javascript/ES6 )

import { useState } from "react"
import axios from "axios"

function Registration() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const [username,setUsername] = useState('')
    const [role,setRole]=useState('user')
    const [formErrors, setFormErrors] = useState({})
    const [serverErrors, setServerErrors] = useState('') 

    //using es7-async await
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const FormData={
            username,
            email,
            password,
            role 
        }
        try{
        const response= await axios.post('http://localhost:3033/api/users/register',FormData)
        
          console.log(response)
            alert('successfully registered in')
            setServerErrors("")
          setEmail('')
          setPassword("")
          setUsername("")
          //  props.loginSuccess() //
        }catch(err){
            console.log(err)
            setServerErrors(err.response.data.errors)
        }
    }

  return (
    <div className="col-md-6 offset-md-3 " style={{marginTop: '100px'}}>
        
        <h4 className="text-center">Register Here</h4>
        <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="username"
                    >User name</label>
                    <input 
                        type="text" 
                        value={username} 
                         onChange={(e)=>{setUsername(e.target.value)}} 
                        name="username" 
                        className="form-control"
                        id="username"
                    />
                </div>
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
                </div>
                <br/>

                <input 
                     type="radio" 
                     checked={role==="user"}  
                     style={{accentColor:"blue"}} 
                    name="role" value="user" 
                    onChange={(e)=>{setRole(e.target.value)}} 
            />Need a space
        
                <input 
                type="radio" style={{accentColor:"blue",marginLeft:"30px"}} 
                name="role" value="proprietor" 
                onChange={(e)=>{setRole(e.target.value)}} 
                />Advertise my Office
               
                <br/>
                {
                serverErrors.length > 0 &&  (
                    <div style={{color:"red"}}>
                        These errors prohibited the form from being saved: 
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

export default Registration

//product-form from invoice project
/*
import { useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { startCreateProduct, startUpdateProduct } from '../actions/products-action'
export default function ProductForm(props) {
    
    const dispatch = useDispatch()
    const serverErrors = useSelector((state) => {
        return state.products.serverErrors
    })

   
    const product = useSelector((state) => {
        return state.products.data.find(ele => ele._id == props.editId )
    })

    console.log(product)

    // name, price, description, stockLevel, reorderLevel
    const [form, setForm] = useState(product ? {
        name: product.name,
        price: product.price,
        description: product.description,
        stockLevel: product.stockLevel,
        reorderLevel: product.reorderLevel
    } : {
        name: '',
        price: '',
        description: '',
        stockLevel: '',
        reorderLevel: '',
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // run client validations 

        const resetForm = () => {
            setForm({ 
                name: '',
                price: '',
                description: '',
                reorderLevel: '',
                stockLevel: ''
            })
        }

        if(product) {
            dispatch(startUpdateProduct(product._id, form, resetForm, props.toggle))
        } else {
            dispatch(startCreateProduct(form, resetForm))      
        }
        
    }

    return (
        <>
            {
                serverErrors.length > 0 &&  (
                    <div>
                        These errors prohibited the form from being saved: 
                        <ul>
                            { serverErrors.map((ele, i) => {
                                return <li key={i}> { ele.msg }</li>
                            })}
                        </ul>
                    </div>
                )
            }
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="name"
                    >Name</label>
                    <input 
                        type="text" 
                        value={form.name} 
                        onChange={handleChange} 
                        name="name" 
                        className="form-control"
                        id="name"
                    />
                </div>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="price"    
                    >Price</label>
                    <input 
                        type="text" 
                        value={form.price} 
                        onChange={handleChange} 
                        name="price" 
                        id="price"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label
                        className="form-label"
                        htmlFor="description"
                    >Description</label>
                    <textarea
                        className="form-control"
                        value={form.description}
                        onChange={handleChange} 
                        name="description"
                        id="description"
                    >
                    </textarea>
                </div>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="stockLevel"    
                    >Stock Level</label>
                    <input 
                        type="text" 
                        value={form.stockLevel} 
                        onChange={handleChange} 
                        name="stockLevel" 
                        id="stockLevel"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="reorderLevel"    
                    >Reorder Level</label>
                    <input 
                        type="text" 
                        value={form.reorderLevel} 
                        onChange={handleChange} 
                        name="reorderLevel" 
                        id="reorderLevel"
                        className="form-control"
                    />
                </div>
                <input type="submit" className="btn btn-primary" />
            </form>
        </>
    )
}
*/

//registration from job portal

/*
import { useState } from 'react'
import axios from 'axios'

export default function RegisterComponent(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const [username,setUsername] = useState('')
    const [role,setRole]=useState('')
    const [formErrors, setFormErrors] = useState({})
    const [serverErrors, setServerErrors] = useState('') 

    //using es7-async await
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const FormData={
            username,
            email,
            password,
            role 
        }
        try{
        const response= await axios.post('http://localhost:3055/api/users/register',FormData)
        
          
            alert('successfully registered in')
          //  props.loginSuccess() //
        }catch(err){
            setServerErrors(err.response.data.notice)
        }
    }

 
    return (
        <div>
            <h2>Users Registration</h2>
            { serverErrors && <p style={{ color: 'red'}}>{ serverErrors }</p>}
            <form onSubmit={handleSubmit}>
            <label htmlFor="username">Enter Username</label> <br />
                <input 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    id="username" 
                    name="username" 
                /> <br/>
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
                 <label htmlFor="role">Enter Role</label> <br />
                <input 
                    type="text" 
                    value={role} 
                    onChange={e => setRole(e.target.value)} id="role" 
                    name="role" 
                /> 
                <input type="submit" /> 
            </form>
        </div>
    )
}*/