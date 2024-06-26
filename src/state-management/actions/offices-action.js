import axios from 'axios'
export const startGetOffices = (city) => { 
    console.log(city)
    return async (dispatch) => {
        try {
            let response
            if(city){
                response = await axios.get(`http://localhost:3033/api/offices/search?city=${city}`)
            }else{
                 response = await axios.get('http://localhost:3033/api/offices')
            }
            dispatch(setOffices(response.data))
            console.log("all offices",response.data)
        } catch(err) {
            alert(err.response.data)
        }
    }
}

const setOffices = (data) => {
    return { 
        type: 'SET_OFFICES', payload: data 
    }
}

export const startGetMyOffices = (id) => { 
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3033/api/offices/my",{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })

            dispatch(setMyOffices(response.data))
            console.log("my offices",response.data)
        } catch(err) {
            console.log(err)
            alert(err.response.data)
        }
    }
}

const setMyOffices = (data) => {
    return { 
        type: 'SET_MY_OFFICES', payload: data 
    }
}

export const startCreateOffice = (formData, resetForm) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3033/api/offices', formData,{
                 headers:{
                    Authorization:localStorage.getItem('token'),
                    'Content-Type':"multipart/form-data"
                }
                 })
            dispatch(addOffice(response.data))
            dispatch(setServerErrors([]))
            resetForm()
            alert("successfully office has been submitted, wait for admin-approval")
        } catch(err) {
            console.log(err.response.data)

            if(err.response.data.errors){
                dispatch(setServerErrors(err.response.data.errors))
                alert("server error")
            }else{
                alert("error",err.response.data)
            }
            //dispatch(setServerErrors(err.response.data))
            //dispatch(setServerErrors(err.response.data.errors))
        }
    }
}

const addOffice = (office) => {
    return {
        type: "ADD_OFFICE",
        payload: office 
    }
}

export const setServerErrors = (errors) => {
    return { 
        type: "SET_ERRORS",
        payload: errors 
    }
}

export const startUpdateOffice = (id, formData, resetForm, toggle) => {
    return async (dispatch) => {
        try {
            console.log("formData in office-actions/updateOffice",formData)
            const response = await axios.put(`http://localhost:3033/api/offices/${id}`, formData,{
                headers:{
                   Authorization:localStorage.getItem('token'),
                   'Content-Type':"multipart/form-data"
               }
             }) 
            dispatch(updateOffice(response.data)) 
            dispatch(setServerErrors([]))
            resetForm()
            toggle()
            alert("successfully updated")
        } catch(err) {
            if(err.response.data.errors){
                dispatch(setServerErrors(err.response.data.errors))
                alert("validation error")
            }else{
                alert(err.response.data)
            }
        }
    }
}

const updateOffice = (office) => {
    return {
        type: 'UPDATE_OFFICE',
        payload: office 
    }
}

export const startSoftRemoveOffice = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:3033/api/offices/${id}/owner`,{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            dispatch(removeOffice(response.data))
        } catch(err) {
            alert(err.response.data)
        }
    }
}

const removeOffice= (office) => {
    return {
        type: 'REMOVE_OFFICE',
        payload: office
    }
}