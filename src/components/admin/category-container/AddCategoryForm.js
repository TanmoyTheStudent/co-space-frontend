import { useState } from "react"
import axios from "axios"
//import { Link,useNavigate } from "react-router-dom"
//import CategoryTable from "./CategoryTable"


function AddCategoryForm(props) {
   
    //console.log(props)
    // //getting the required category for editting from all categories
    // const editCategory = props.categories.find(ele => ele._id === props.editId)
    //const navigate=useNavigate()

    const [categoryName,setCategoryName]=useState(props.category?props.category.name : "")
    const [serverErrors,setServerErrors]=useState(null)
    const [formErrors,setFormErrors]=useState({})
    const errors={}

    const validateErrors=()=>{
        if(categoryName.trim().length===0){
            errors.categoryName="Category Name is required"
        }
    }

const handleSubmit=async (e)=>{
        e.preventDefault()
        
        const formData={
            name:categoryName
        }

        validateErrors()
        console.log("form Error",errors)

    if(Object.keys(errors).length===0){

        if(props.category){
            try{
                const response= await axios.put(`http://localhost:3033/api/categories/${props.editId}`,formData,{
                    headers:{
                        Authorization:localStorage.getItem('token')}
                    })
                console.log(response.data)   
                
                setCategoryName("")
                setServerErrors(null)
                setFormErrors({})
                props.toggle()
                window.location.reload() //only solution -use context api  or redux, otherwise, CategoryTable would not be uploaded after editting
                
               // navigate("/add-category")
            //    const result= await axios.get("http://localhost:3033/api/categories",{
            //     headers:{
            //       Authorization: localStorage.getItem("token")
            //     }
            // })
               //return <CategoryTable categories={result}
            }catch(err){
                console.log(err)
                setServerErrors(err.response.data)
                setFormErrors({})
            }
        }else{
            try{
                const response= await axios.post("http://localhost:3033/api/categories",formData,{
                    headers:{
                        Authorization:localStorage.getItem('token')}
                    })
                //console.log(response.data)
                props.addCategory(response.data)
                setCategoryName("")
                setServerErrors(null)
                setFormErrors({})
            }catch(err){
                console.log(err)
                setServerErrors(err.response.data)
                setFormErrors({})
            }
        }
        
    }else{
        setFormErrors(errors)
    }  
}

  return (
    <>
       <h4>
            {props.category? <p>Edit the Category</p>: <p>Add New Category</p>}
       </h4>
       <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="categoryName"
                    >Enter category name</label>
                    <input 
                        type="text" 
                        name="name"
                        id="categoryName"
                        className="form-control"
                        value={categoryName} 
                        onChange={(e)=>{setCategoryName(e.target.value)}}   
                    />
                     {formErrors.categoryName && <span style={{color:"red"}}>{formErrors.categoryName}</span>}
                </div>
                <br/>

                {serverErrors && (
                    <div style={{ color: "red" }}>
                        These errors prohibited the form from being logged in:
                        {serverErrors.errors ? (
                            <ul>
                                {serverErrors.errors.map((error, i) => (
                                    <li key={i}>{error.msg}</li>
                                ))}
                            </ul>
                        ) : (serverErrors.error && (
                            <ul>
                                <li>{serverErrors.error}</li>
                            </ul>
                        ))
                      }
                    </div>
                )}
               
               
               <input type="submit" className="btn btn-primary" />
           </form>
   
   </>
  )
}

export default AddCategoryForm

//sever error-logic--two errors--1.errors, 2.error

 /* {
                    serverErrors && (( serverErrors.errors && (
                        <div style={{color:"red"}}>
                            These errors prohibited the form from being logged in : 
                            <ul>
                                { serverErrors.errors.map((ele, i) => {
                                    return <li key={i}> { ele.msg }</li>
                                })}
                            </ul>
                        </div>)
                    ) ||(serverErrors.error && (
                        <div style={{color:"red"}}>
                            These errors prohibited the form from being logged in : 
                            <ul>
                                { serverErrors.error}
                            </ul>
                        </div>)))
                } */