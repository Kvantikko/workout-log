import { createSlice, createAction } from '@reduxjs/toolkit'
import StopWatchWorkerManager from '../../workers/StopWatchWorkerManager'
import { logout } from "./userReducer"
import { startEmptyWorkout } from './workoutReducer'

const restWatchWorkerManager = new StopWatchWorkerManager("../stopwatch-worker.js") // two new threads
const workoutWatchWorkerManager = new StopWatchWorkerManager("../stopwatch-worker.js")

const initialState = {
    restWatch: {
        time: 0,
        isActive: false,
    },
    workoutWatch: {
        time: 0,
        isActive: false,
    }
}

const stopWatchSlice = createSlice({
    name: 'stopWatch',
    initialState,
    reducers: {
        _startRestWatch: (state, action) => {
            restWatchWorkerManager.postMessageToWorker("start")
            state.restWatch.isActive = true
            return state
        },
        updateRestWatch: (state, action) => {
            state.restWatch.time = action.payload;
            return state
        },
        resetRestWatch: (state, action) => {
            restWatchWorkerManager.postMessageToWorker("reset")
            state.restWatch.time = 0
            state.restWatch.isActive = false
            return state
        },
        pauseRestWatch: (state, action) => {
            restWatchWorkerManager.postMessageToWorker("pause")
            state.restWatch.isActive = false
            return state
        },



        _startWorkoutWatch: (state, action) => {
            console.log("_startWorkoutWatch")
            workoutWatchWorkerManager.postMessageToWorker("start")
            state.workoutWatch.isActive = true
            return state
        },
        updateWorkoutWatch: (state, action) => {
            state.workoutWatch.time = action.payload;
            return state
        },
        _resetWorkoutWatch: (state, action) => {
            workoutWatchWorkerManager.postMessageToWorker("reset")
            state.workoutWatch.time = 0
            state.workoutWatch.isActive = false
            return state
        },
        pauseWorkoutWatch: (state, action) => {
            workoutWatchWorkerManager.postMessageToWorker("pause")
            state.workoutWatch.isActive = false
            return state
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return initialState
        })
    },
});

export const {
    _startRestWatch,
    updateRestWatch,
    _resetWorkoutWatch,
    pauseRestWatch,
    _startWorkoutWatch,
    updateWorkoutWatch,
    resetRestWatch,
    pauseWorkoutWatch
} = stopWatchSlice.actions;

export default stopWatchSlice.reducer

export const startWorkoutWatch = () => {
    return (dispatch, getState) => {
        dispatch(_startWorkoutWatch()) 
        if(getState().stopWatch.workoutWatch.time === 0) {
            dispatch(startEmptyWorkout()) 
        }
        workoutWatchWorkerManager.getWorker().onmessage = (e) => {
            dispatch(updateWorkoutWatch(e.data))
        }
    }
}

export const startRestWatch = () => {
    return (dispatch) => {
        dispatch(_startRestWatch())    
        restWatchWorkerManager.getWorker().onmessage = (e) => {
            dispatch(updateRestWatch(e.data))
        }
    }
}

export const resetWatches = () => {
    return (dispatch) => {
        dispatch(resetRestWatch())
        dispatch(_resetWorkoutWatch())
    }
}

export const resetWorkoutWatch = () => {
    console.log("GALABAGOS SASAASA RERAWELADLW");
    return (dispatch) => {
        dispatch(_resetWorkoutWatch())
        dispatch(__resetWorkoutWatch())
        dispatch(startEmptyWorkout({ isReset: true }))

    }
}

export const __resetWorkoutWatch = createAction("resetWorkoutWatch")

