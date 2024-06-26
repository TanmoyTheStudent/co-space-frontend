const initialState = {
    data: [],
    serverErrors: [],
    allOffices:[]
}

const officesReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_OFFICES' : {
            return {...state, allOffices: action.payload}
        }
        case 'SET_MY_OFFICES' : {
            return {...state, data: action.payload}
        }
        case 'ADD_OFFICE' : {
            return {...state, data: [...state.data, action.payload ]}
        }
        case 'SET_ERRORS' : {
            return {...state, serverErrors: action.payload }
        }
        case 'UPDATE_OFFICE' : {
            return { ...state, data: state.data.map((ele) => {
                if(ele._id == action.payload._id) {
                    return action.payload 
                } else {
                    return ele 
                }
            })}
        }
        case 'REMOVE_OFFICE': {
            return {...state, data: state.data.filter(ele => ele._id != action.payload._id )}
        }
        default: {
            return { ...state }
        }
    }
}

export default officesReducer