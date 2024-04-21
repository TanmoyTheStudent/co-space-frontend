import axios from 'axios'
export const startGetOffices = () => { 
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3033/api/offices')
            dispatch(setOffices(response.data))
            console.log(response.data)
        } catch(err) {
            alert(err.message)
        }
    }
}

const setOffices = (data) => {
    return { 
        type: 'SET_OFFICES', payload: data 
    }
}

export const startCreateOffice = (formData, resetForm) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3033/api/offices', formData,{
                 headers:{
                    Authorization:localStorage.getItem('token')}
                 })
            dispatch(addOffice(response.data))
            dispatch(setServerErrors([]))
            resetForm()
        } catch(err) {
            console.log(err.response.data)
            dispatch(setServerErrors(err.response.data))
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
            const response = await axios.put(`http://localhost:3050/api/offices/${id}`, formData) 
            dispatch(updateOffice(response.data)) 
            resetForm()
            toggle()
        } catch(err) {
            dispatch(setServerErrors(err.response.data.errors))
        }
    }
}

const updateOffice = (office) => {
    return {
        type: 'UPDATE_OFFICE',
        payload: office 
    }
}

export const startRemoveOffice = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:3050/api/offices/${id}`)
            dispatch(removeOffice(response.data))
        } catch(err) {

        }
    }
}

const removeOffice= (office) => {
    return {
        type: 'REMOVE_OFFICE',
        payload: office
    }
}