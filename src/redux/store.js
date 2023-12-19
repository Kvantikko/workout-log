import { createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

/* import { createExercise } from './reducers/exerciseReducer'
import exerciseReducer from './reducers/exerciseReducer' */
import exerciseLibraryReducer from './reducers/exerciseLibraryReducer'
import workoutReducer from './reducers/workoutReducer'
import historyReducer from './reducers/historyReducer'
import stopWatchReducer from './reducers/stopWatchReducer'
import timerReducer from './reducers/timerReducer'
import exerciseHistoryReducer from './reducers/exerciseHistoryReducer'
import userReducer from './reducers/userReducer'
import darkModeReducer from './reducers/darkModeReducer'
import navReducer from './reducers/navReducer'
import searchReducer from './reducers/searchReducer'
import drawerReducer from './reducers/drawerReducer'
import templateReducer from './reducers/templateReducer'
import templateLibraryReducer from './reducers/templateLibraryReducer'


const store = configureStore({
    reducer: {
        user: userReducer,
        workout: workoutReducer,
        exerciseLibrary: exerciseLibraryReducer,
        history: historyReducer,
        exerciseHistory: exerciseHistoryReducer,
        stopWatch: stopWatchReducer,
        timer: timerReducer,
        darkMode: darkModeReducer,
        nav: navReducer,
        search: searchReducer,
        drawer: drawerReducer,
        template: templateReducer,
        templates: templateLibraryReducer
    }
})

export default store