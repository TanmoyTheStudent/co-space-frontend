import { useState } from "react"
import axios from "axios"
import { FaStar } from "react-icons/fa"

function Rating(props) {
    const spaceId=props.editId
    const reviewInfo=props.reviewInfo
    console.log("space Id in rating",spaceId)
    //checking whether the rating during modification
    let previousRating
    let previousReview
    let reviewChecking
   if(reviewInfo.length>0){
    reviewChecking=reviewInfo.find(ele=>ele.space===spaceId)
      if(reviewChecking){
             previousRating=reviewChecking.rating
             previousReview=reviewChecking.review
          }
    }
    //rating setting
   const [rating,setRating]=useState(previousRating?previousRating:null)
   const [review,setReview]=useState(previousReview?previousReview:null)
    const [hover,setHover]=useState(null)
    console.log("rating",rating)
   console.log("hover",hover)

   
  //rating submit
  const handleClick=async ()=>{
    const formData={
        space:spaceId,
        rating:(hover >= 1 && hover <= 5) ? hover : rating,
        review:review
    }
try{
    if(reviewChecking){
        const response=await axios.put(`http://localhost:3033/api/reviews/${reviewChecking._id}`,formData,{
            headers:{
                Authorization:localStorage.getItem("token")
             }
        })
        console.log("review modified",response.data)
        alert("successfully review modified")
        props.reviewUpdates(response.data)
    }else{
        const response=await axios.post("http://localhost:3033/api/reviews",formData,{
            headers:{
                Authorization:localStorage.getItem("token")
             }
        })
        alert("Thank you for giving review")
        console.log("review posted",response.data)
        props.addReview(response.data)
    }
    if(hover){
        setRating(hover)
    }   
}catch(err){
    console.log(err.response)
}
}
    
  return (
    <div style={{textAlign:"center"}}>
        {
            [1,2,3,4,5].map((star,index)=>{
                const currentRating=index+1
                return(
                    <>
                    <label key={index}>
                        <input
                            type="radio" 
                            name="rating" 
                           style={{display:"none"}}
                            checked={rating==currentRating} 
                            value={currentRating} 
                           onChange={(e)=>{setRating(currentRating)}} 
                        />
                            <FaStar 
                                 style={{cursor:"pointer"}}
                                 color={currentRating<=(hover||rating)?"#ffc107":"#B3B8AB"}
                                 size={40}
                                 onMouseEnter={()=>{setHover(currentRating)}}
                                 onMouseLeave={()=>{setHover(null)}}

                            />
                       </label> 
                           
                    </>
                )
            })
        }
        <br/>
        <div className="form-group">
                <label
                    className="form-label"
                    htmlFor="review"
                >Your Review</label>
                <textarea
                    className="form-control"
                    value={review}
                    onChange={(e)=>{setReview(e.target.value)}} 
                    name="review"
                    id="review"
                >
                </textarea>
            </div>
            <br/>
        <button onClick={handleClick}>Submit Rating</button>

    </div>
  )
}

export default Rating