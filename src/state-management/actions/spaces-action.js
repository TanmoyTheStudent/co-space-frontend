import axios from 'axios'
export const startGetSpaces = (id) => { 
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3033/api/offices/${id}/spaces`)
            dispatch(setSpaces(response.data))
        } catch(err) {
            alert(err.response.data)
            console.log(err)
        }
    }
}

const setSpaces = (data) => {
    return { 
        type: 'SET_SPACES', payload: data 
    }
}

export const startCreateSpace = (formData, resetForm) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3033/api/spaces',formData,{
                headers:{
                   Authorization:localStorage.getItem('token'),
                   'Content-Type':"multipart/form-data"
               }
                })
            dispatch(addSpace(response.data))

            console.log(response.data)

            dispatch(setServerErrors([]))
            resetForm()
            alert("suceessfully space created")
        } catch(err) {
            console.log(err)
            dispatch(setServerErrors(err.response.data.errors))
            alert("errors")
        }
    }
}

const addSpace = (space) => {
    return {
        type: "ADD_SPACE",
        payload: space 
    }
}

export const setServerErrors = (errors) => {
    return { 
        type: "SET_ERRORS",
        payload: errors 
    }
}

export const startUpdateSpace = (id,formData,resetForm, toggle) => {
    console.log("id",id)
    console.log("formdata",formData)
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:3033/api/spaces/${id}`,formData,{
                headers:{
                   Authorization:localStorage.getItem('token'),
                   'Content-Type':"multipart/form-data"
               }
            }) 
            console.log("in startUpdateSpace",response.data)
            dispatch(updateSpace(response.data)) 
            resetForm()
            toggle()
            dispatch(setServerErrors([]))
            alert("successfully updated")
        } catch(err) {
            console.log(err)
            // if(err.response.data.errors){
            //     dispatch(setServerErrors(err.response.data.errors))
            //     console.log(err.response.data.errors)
            // }else{
            //     alert(err.response.data)
            //     console.log(err)
            // }
            
          alert("errors")
        }
    }
}

export const updateSpace = (space) => {
    return {
        type: 'UPDATE_SPACE',
        payload: space 
    }
}

export const startRemoveSpace = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:3033/api/spaces/${id}`,{
                headers:{
                   Authorization:localStorage.getItem('token'),
                   'Content-Type':"multipart/form-data"
               }
                })
            dispatch(removeSpace(response.data))
        } catch(err) {

        }
    }
}

const removeSpace = (space) => {
    return {
        type: 'REMOVE_SPACE',
        payload: space
    }
}


export const startGetSingleSpace = (id) => { 
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3033/api/spaces/${id}`)
            dispatch(setSingleSpace(response.data))
        } catch(err) {
            alert(err.message)
        }
    }
}

const setSingleSpace = (data) => {
    return { 
        type: 'SET_SINGLE_SPACE', payload: data 
    }
}