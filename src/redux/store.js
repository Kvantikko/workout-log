import { createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

/* import { createExercise } from './reducers/exerciseReducer'
import exerciseReducer from './reducers/exerciseReducer' */
import exerciseLibraryReducer from './reducers/exerciseLibraryReducer'
import workoutReducer from './reducers/workoutReducer'
import historyReducer from './reducers/historyReducer'
import modalReducer from './reducers/modalReducer'
import stopWatchReducer from './reducers/stopWatchReducer'
import timerReducer from './reducers/timerReducer'
import setReducer from './reducers/setReducer'
import exerciseReducer from './reducers/exerciseReducer'
import exerciseHistoryReducer from './reducers/exerciseHistoryReducer'
import userReducer from './reducers/userReducer'
import darkModeReducer from './reducers/darkModeReducer'
import navReducer from './reducers/navReducer'
import searchReducer from './reducers/searchReducer'
import drawerReducer from './reducers/drawerReducer'

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
        stopWatch: stopWatchReducer,
        timer: timerReducer,
        darkMode: darkModeReducer,
        nav: navReducer,
        search: searchReducer,
        drawer: drawerReducer
    }
})

export default store