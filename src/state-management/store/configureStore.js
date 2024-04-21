import { createStore, combineReducers, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import officesReducer from '../reducers/offices-reducer'
import spacesReducer from '../reducers/spaces-reducer'
import bookingsReducer from '../reducers/bookings-reducer'
const configureStore = () => {
    const store = createStore(combineReducers({
        offices: officesReducer, 
        spaces: spacesReducer,
        bookings:bookingsReducer
    }), applyMiddleware(thunk))
    return store 
}

export default configureStore