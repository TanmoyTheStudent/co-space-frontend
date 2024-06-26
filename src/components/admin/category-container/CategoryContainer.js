import { useState,useEffect } from "react"
import axios from "axios"
import AddCategoryForm from "./AddCategoryForm"
import CategoryTable from "./CategoryTable"
import AdminSidebar from "../AdminSidebar"


function CategoryContainer() {
  const [categories,setCategories]=useState(null)

 
  useEffect(()=>{

    if(localStorage.getItem('token')){

    (async()=>{
      try{
          const response= await axios.get("http://localhost:3033/api/categories",{
                headers:{
                  Authorization: localStorage.getItem("token")
                }
            })
            //console.log("categories",response)
            setCategories(response.data)
        }catch(err){
            console.log(err)
        }
      })();
    }

  },[])

  const addCategory = (category) => {
    setCategories([...categories, category])
}

const removeCategory = (obj) => {
    const newArr = categories.filter((ele) => {
        return ele._id !== obj._id 
    })
    setCategories(newArr) 
}

//console.log("categories",categories)

  return (
    <div className="row">
      <div className='col-4 col-sm-2 col-md-2 col-lg-2 bg-danger' style={{height:'535px'}} >
        <AdminSidebar/>
   </div>

   <div className='col-8 col-sm-8 col-md-6 col-lg-8 p-5 '>
   { categories &&
      <div className=" col-10 p-4" style={{ backgroundColor: '#E6E6FA' }}>
       <AddCategoryForm
            addCategory={addCategory}
        />
      </div>
 }
      <br/><br/>

    { categories &&
    <div>
      <h3 style={{textAlign:"center", marginBottom: '15px' }}>Categories List-{" "}{categories.length}</h3> 
        {categories.length===0 ? <p style={{color:"red"}}>No categories please add categories</p> :(
           <CategoryTable 
                categories={categories}
                removeCategory={removeCategory}
       />
        )}
    </div>

  } 
      </div>   
    </div>
  )
}

export default CategoryContainer