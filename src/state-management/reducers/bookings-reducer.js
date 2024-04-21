const initialState = {
    data: [],
    serverErrors: []
}

const bookingsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_BOOKINGS' : {
            return {...state, data: action.payload}
        }
        case 'ADD_BOOKING' : {
            return {...state, data: [...state.data, action.payload ]}
        }
        case 'SET_ERRORS' : {
            return {...state, serverErrors: action.payload }
        }
        case 'UPDATE_BOOKING' : {
            return { ...state, data: state.data.map((ele) => {
                if(ele._id == action.payload._id) {
                    return action.payload 
                } else {
                    return ele 
                }
            })}
        }
        case 'REMOVE_BOOKING': {
            return {...state, data: state.data.filter(ele => ele._id != action.payload._id )}
        }
        default: {
            return { ...state }
        }
    }
}

export default bookingsReducer