import axios from 'axios'
export const startGetBookings = () => { 
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3033/api/bookings')
            dispatch(setBookings(response.data))
        } catch(err) {
            alert(err.message)
        }
    }
}

const setBookings = (data) => {
    return { 
        type: 'SET_BOOKINGS', payload: data 
    }
}

export const startCreateBooking = (formData, resetForm) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3033/api/bookings', formData)
            dispatch(addBooking(response.data))
            dispatch(setServerErrors([]))
            resetForm()
        } catch(err) {
            dispatch(setServerErrors(err.response.data.errors))
        }
    }
}

const addBooking = (booking) => {
    return {
        type: "ADD_BOOKING",
        payload: booking 
    }
}

export const setServerErrors = (errors) => {
    return { 
        type: "SET_ERRORS",
        payload: errors 
    }
}

export const startUpdateBooking = (id, formData, resetForm, toggle) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:3050/api/bookings/${id}`, formData) 
            dispatch(updateBooking(response.data)) 
            resetForm()
            toggle()
        } catch(err) {
            dispatch(setServerErrors(err.response.data.errors))
        }
    }
}

const updateBooking = (booking) => {
    return {
        type: 'UPDATE_BOOKING',
        payload: booking 
    }
}

export const startRemoveBooking = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:3050/api/bookings/${id}`)
            dispatch(removeBooking(response.data))
        } catch(err) {

        }
    }
}

const removeBooking = (booking) => {
    return {
        type: 'REMOVE_BOOKING',
        payload: booking
    }
}