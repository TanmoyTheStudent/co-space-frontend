export default function amenitiesReducer (state, action) {
    
    switch(action.type) {
        case 'SET_AMENITIES' : {
            return {...state, data: action.payload }
        }
        case 'ADD_AMENITY' : {
            return {...state, data: [...state.data, action.payload ]}
        }
        case 'SET_ERRORS' : {
            return {...state, serverErrors: action.payload}
        }
        case 'REMOVE_AMENITY' : {
            return {...state, data: state.data.filter(ele => ele._id !== action.payload._id)}
        }

        case 'UPDATE_AMENITY' : {
            return {...state, data: state.data.map((ele) => {
                if(ele._id === action.payload._id) {
                    return action.payload 
                } else {
                    return ele
                }
            })}
        }
        
        default: {
            return {...state }
        }
    }
}