import { useState,useEffect } from "react"
import axios from "axios";
//import { useDispatch} from 'react-redux'
//import { startGetOffices } from "../../state-management/actions/offices-action"

function AdminApproval() {
    //const dispatch = useDispatch()
    const [unapprovedOffices,setUnapprovedOffices]=useState(null)

 
  useEffect(()=>{
    (async()=>{
      try{
          const response= await axios.get("http://localhost:3033/api/offices/unapproved",{
                headers:{
                  Authorization: localStorage.getItem("token")
                }
            })
            console.log("unapproved offices",response)
            setUnapprovedOffices(response.data)
            //dispatch(startGetOffices())
        }catch(err){
            console.log(err)
        }
      })();
    }
,[])

const handleSubmit=async (id)=>{
    try{
        const response= await axios.put(`http://localhost:3033/api/offices/approval`,{id:id},{
            headers:{
                Authorization:localStorage.getItem('token')}
            })
        console.log(response.data) 
        const temp=unapprovedOffices.filter(ele=>ele._id!==id) 
        setUnapprovedOffices(temp)
    }catch(err){
        console.log(err)
    }
}

  return (
    <div>

    <div className="col-md-6 offset-md-3 " style={{marginTop: '100px'}}>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sl. No.</th>
                        <th>Owner's username</th>
                        <th>Office Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { unapprovedOffices && 
                      unapprovedOffices.map((ele,i) => {
                        return (
                            <tr key={i}>
                                <td>{ i+1 }</td>
                                <td>{ele.user.username}</td>
                                <td>{ ele.title }</td>
                                
                                <td>
                                        <button onClick={(e)=>{handleSubmit(ele._id)}}>Approve</button>
                                </td>
                             </tr>
                        )
                    }) }
                </tbody>
            </table>
    </div>
    </div>
  )
}

export default AdminApproval