import {useEffect} from 'react'
import axios from 'axios'
import imageSrc from '../../images/paymentFailed.png';

export default function Cancel(){
        useEffect(()=>{
            (async()=>{
                try{
                    const stripeId = localStorage.getItem('stripeId')
                    const payment = await axios.put(`http://localhost:3033/api/payments/${stripeId}/failed`,{paymentStatus:"Failed"})
                }catch(err){
                    console.log(err)
                }
            })()
        },[])
    return (
        <div>
        <img src={imageSrc} alt={imageSrc} width="400" height="500" style={{marginLeft:"20px"}} />    
        </div>
    )
}