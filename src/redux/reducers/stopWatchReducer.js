import { createSlice } from '@reduxjs/toolkit'
import StopWatchWorkerManager from '../../workers/StopWatchWorkerManager'

const restWatchWorkerManager = new StopWatchWorkerManager("./restwatch-worker.js")
const workoutWatchWorkerManager = new StopWatchWorkerManager("./workoutwatch-worker.js")

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



        _startWorkoutWatch: (state, action) => {
            console.log("kullii");
            // workoutWatchWorkerManager.postMessageToWorker("start")
            state.workoutWatch.isActive = true
            /*    workoutWatchWorkerManager.getWorker().onmessage = (e) => {
                    console.log("PESE");
                } */
            //state.workoutWatch.time = restWatchWorkerManager.onMessage()
            return state
        },
        updateWorkoutWatch: (state, action) => {
            state.workoutWatch.time = action.payload;
            return state
        },
        resetWorkoutWatch: (state, action) => {
            workoutWatchWorkerManager.postMessageToWorker("reset")
            state.workoutWatch.time = 0
            state.workoutWatch.isActive = false
            return state
        },
    }
});

export const {
    _startRestWatch,
    updateRestWatch,
    resetWorkoutWatch,
    _startWorkoutWatch,
    updateWorkoutWatch,
    resetRestWatch,
} = stopWatchSlice.actions;

export default stopWatchSlice.reducer

export const startWorkoutWatch = () => {
    return (dispatch) => {
        dispatch(_startWorkoutWatch())
        workoutWatchWorkerManager.postMessageToWorker("start")
        workoutWatchWorkerManager.getWorker().onmessage = (e) => {
            dispatch(updateWorkoutWatch(e.data))
        }
    }
}

export const startRestWatch = () => {
    return (dispatch) => {
        dispatch(_startRestWatch())
        restWatchWorkerManager.postMessageToWorker("start")
        restWatchWorkerManager.getWorker().onmessage = (e) => {
            dispatch(updateRestWatch(e.data))
        }
    }
}

export const resetWatches = () => {
    return (dispatch) => {
        dispatch(resetRestWatch())
        restWatchWorkerManager.postMessageToWorker("reset")
        dispatch(resetWorkoutWatch())
        workoutWatchWorkerManager.postMessageToWorker("reset")
    }
}