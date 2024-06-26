import {useEffect} from 'react'
import axios from 'axios'
import imageSrc from '../../images/paymentSuccess.png';

export default function Success(){
    useEffect(()=>{
        (async()=>{
            try{
                const stripeId = localStorage.getItem('stripeId')
                const payment = await axios.put(`http://localhost:3033/api/payments/${stripeId}/success`,{paymentStatus:"Successful"})
                console.log("payment in success.js",payment)
            }catch(err){
                console.log(err)
            }
        })();
    },[])
    return (
        <div>
        <img src={imageSrc} alt="successPicture" width="400" height="400" style={{marginLeft:"10px"}} />    
        </div>
    )
}