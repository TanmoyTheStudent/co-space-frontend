const initialState = {
    data: [],
    singleData:{},
    serverErrors: []
}

const spacesReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_SPACES' : {
            return {...state, data: action.payload}
        }
        case 'SET_SINGLE_SPACE' : {
            return{...state, singleData: action.payload}
        }

        case 'ADD_SPACE' : {
            return {...state, data: [...state.data, action.payload ]}
        }
        case 'SET_ERRORS' : {
            return {...state, serverErrors: action.payload }
        }
        case 'UPDATE_SPACE' : {
            return { ...state, data: state.data.map((ele) => {
                console.log("in space reducer",ele)
                if(ele._id == action.payload._id) {
                    return action.payload 
                } else {
                    return ele 
                }
            })}
        }
        case 'REMOVE_SPACE': {
            return {...state, data: state.data.filter(ele => ele._id != action.payload._id )}
        }
        default: {
            return { ...state }
        }
    }
}

export default spacesReducer