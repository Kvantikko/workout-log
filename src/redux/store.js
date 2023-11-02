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


//import workoutReducer from './reducers/workoutReducer'

//const dispatch = useDispatch()
//dispatch(createExercise('Redux Toolkit is awesome!'))


const store = configureStore({
    reducer: {
        workout: workoutReducer,
        sets: setReducer,
        exerciseLibrary: exerciseLibraryReducer,
        history: historyReducer,
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