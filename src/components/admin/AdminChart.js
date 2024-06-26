import { useState,useEffect } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar"
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

// defaults.maintainAspectRatio = false;
 defaults.responsive = true;

 defaults.plugins.title.display = true;
 defaults.plugins.title.align = "start";
 defaults.plugins.title.font.size = 20;
 defaults.plugins.title.color = "black";


function AdminChart() {
  const [bookingList,setBookingList]=useState(null)

 
  useEffect(()=>{
    (async()=>{
      try{
          const response= await axios.get("http://localhost:3033/api/bookings",{
                headers:{
                  Authorization: localStorage.getItem("token")
                }
            })
            console.log("total bookings",response)
            setBookingList(response.data)
           
        }catch(err){
            console.log(err)
        }
      })();
    }
,[])

const revenue=(data)=>{
  console.log(data)
  let monthlyData=[]
  const monthlyRevenue=[]
  for(let i=0;i<12;i++){
    const temp=data.filter((ele)=>{
           const startingDate = new Date(ele.bookingTime.starting)
           //console.log(startingDate)
           // Get the month (0-indexed, so 4 means May)
           const month = startingDate.getMonth() + 1;
           //console.log("month",month)
           return month===i+1
            })
    monthlyData.push(temp)
  }
  console.log("monthly Data",monthlyData)
  for(let i=0;i<monthlyData.length;i++){
    if(monthlyData[i].length==0){
      monthlyRevenue.push(0)
    }else{
      const temp=monthlyData[i].reduce((pv,cv)=>{
                //console.log(pv,cv)
                return pv+cv.totalAmount
      },0)
      //console.log(temp)
      monthlyRevenue.push(temp)
    }
  }
  console.log("monthly revenue",monthlyRevenue) 
  return monthlyRevenue
}

const bookingType=(data)=>{
  const dailyNumber=data.filter(ele=> ele.bookType=="daily").length
  const weeklyNumber=data.filter(ele=> ele.bookType=="weekly").length
  const monthlyNumber=data.filter(ele=> ele.bookType=="monthly").length
  return [dailyNumber,weeklyNumber,monthlyNumber]
}

  return (
    <>
    <div className='col-4 col-sm-2 col-md-2 col-lg-2 bg-danger' style={{height:'550px'}} >
      <AdminSidebar/>
   
   </div>
   
   <div className='col-8 col-sm-8 col-md-6 col-lg-6 '>
   <div className="dataCard customerCard">
        {
          bookingList && 
        <>
        <Bar
          data={{
            // labels: sourceData.map((data) => data.label),
            labels:["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"],
            datasets: [
              {
                label: "Revenue",
                //data: sourceData.map((data) => data.value),
                data:revenue(bookingList),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                borderRadius: 5
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Revenue Source/bar-2024-monthWise",
              },
            },
          }}
        />

< Doughnut
          data={{
            // labels: sourceData.map((data) => data.label),
            labels:["Daily","Weekly","Monthly"],
            datasets: [
              {
                label: "Revenue",
                //data: sourceData.map((data) => data.value),
                data:bookingType(bookingList),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                borderRadius: 2
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Revenue Source/Doughnut- Booking Type",
              },
            },
          }}
        /> 

<Line
          data={{
            // labels: sourceData.map((data) => data.label),
            labels:["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"],
            datasets: [
              {
                label: "Revenue",
                //data: sourceData.map((data) => data.value),
                data:revenue(bookingList),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                borderRadius: 5
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Revenue Source/Line-2024-Monthly",
              },
            },
          }}
        />
        </>
  }
      </div>
   </div>
   </> 
  )
}

export default AdminChart