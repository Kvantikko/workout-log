import { createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

/* import { createExercise } from './reducers/exerciseReducer'
import exerciseReducer from './reducers/exerciseReducer' */
import exerciseLibraryReducer from './reducers/exerciseLibraryReducer'
import workoutReducer from './reducers/workoutReducer'
import historyReducer from './reducers/historyReducer'
import modalReducer from './reducers/modalReducer'
import stopWatchReducer from './reducers/stopWatchReducer'
import setReducer from './reducers/setReducer'
import exerciseReducer from './reducers/exerciseReducer'
import exerciseHistoryReducer from './reducers/exerciseHistoryReducer'
import userReducer from './reducers/userReducer'


//import workoutReducer from './reducers/workoutReducer'

//const dispatch = useDispatch()
//dispatch(createExercise('Redux Toolkit is awesome!'))


const store = configureStore({
    reducer: {
        user: userReducer,
        workout: workoutReducer,
        exercises: exerciseReducer,
        sets: setReducer,
        exerciseLibrary: exerciseLibraryReducer,
        history: historyReducer,
        exerciseHistory: exerciseHistoryReducer,
        modal: modalReducer,
        stopWatch: stopWatchReducer
    }
})

/* const reducer = combineReducers({
    workouts: workoutReducer,
    exercises: exerciseReducer
}) */

//const store = createStore(reducer)

/* store.dispatch(createExercise('Squat', 'Legs'))
store.dispatch(createExercise('Overhead Press', 'Front Deltoids'))
store.dispatch(createExercise('Pullup', 'Back')) */

//console.log("store state: ", store.getState()); // array with objects

export default store