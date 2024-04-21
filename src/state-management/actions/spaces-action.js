import axios from 'axios'
export const startGetSpaces = () => { 
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3033/api/spaces')
            dispatch(setSpaces(response.data))
        } catch(err) {
            alert(err.message)
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
            const response = await axios.post('http://localhost:3033/api/spaces', formData)
            dispatch(addSpace(response.data))
            dispatch(setServerErrors([]))
            resetForm()
        } catch(err) {
            dispatch(setServerErrors(err.response.data.errors))
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

export const startUpdateSpace = (id, formData, resetForm, toggle) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:3050/api/spaces/${id}`, formData) 
            dispatch(updateSpace(response.data)) 
            resetForm()
            toggle()
        } catch(err) {
            dispatch(setServerErrors(err.response.data.errors))
        }
    }
}

const updateSpace = (space) => {
    return {
        type: 'UPDATE_SPACE',
        payload: space 
    }
}

export const startRemoveSpace = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:3050/api/spaces/${id}`)
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