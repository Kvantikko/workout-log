import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import exerciseLibraryReducer from './reducers/exerciseLibraryReducer'
import workoutReducer from './reducers/workoutReducer'
import historyReducer from './reducers/historyReducer'
import stopWatchReducer from './reducers/stopWatchReducer'
import userReducer from './reducers/userReducer'
import navReducer from './reducers/navReducer'
import drawerReducer from './reducers/drawerReducer'
import templateReducer from './reducers/templateReducer'
import templateLibraryReducer from './reducers/templateLibraryReducer'
import dateReducer from './reducers/dateReducer'
import measurementsReducer from './reducers/measurementsReducer'

const store = configureStore({
    reducer: {
        user: userReducer,
        workout: workoutReducer,
        template: templateReducer,
        templates: templateLibraryReducer,
        history: historyReducer,
        exerciseLibrary: exerciseLibraryReducer,
        measurements: measurementsReducer,
        nav: navReducer,
        stopWatch: stopWatchReducer,
        drawer: drawerReducer, // delete... ???
        date: dateReducer, // integrate to history reducer?
    }
})

export default store