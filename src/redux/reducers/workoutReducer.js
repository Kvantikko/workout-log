import { createSlice } from "@reduxjs/toolkit"
import generateId from "../../utils/generateId"
import workoutService from "../../services/workouts"
import { addTemplate, updateTemplate } from "./templateLibraryReducer"
import { addWorkout, removeWorkout, updateWorkout } from "./historyReducer"
import { resetWatches } from "./stopWatchReducer"
import { toast } from "react-toastify"
import { expand, unExpand } from "./drawerReducer"

const getTime = () => {
    const date = new Date()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    //const seconds = String(date.getSeconds()).padStart(2, '0')
    const timeString = `${hours}:${minutes}`
    return timeString
}

const initialState = {
    workoutStarted: false,
    workoutStartTime: null,

    id: null,
    name: "",
    note: "",
    exercises: { byId: {}, allIds: [] },
    //sets: { byId: {}, allIds: [] },
    sets: { byId: {}, byExerciseId: {}, }, // byExerciseId:{} ???
}

const workoutSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        startEmptyWorkout(state, action) {

            //console.log(JSON.parse(JSON.stringify(state)))
            state.workoutStarted = true
            state.workoutStartTime = getTime()
            //window.localStorage.setItem('workoutStartTime', JSON.stringify(getTime()))
            //console.log(JSON.parse(JSON.stringify(state)))
            //setWorkout(state, action)
            return state
        },


        editWorkoutNote(state, action) {
            state.note = action.payload
            return state
        },


        setWorkout(state, action) {





            const workout = action.payload

            console.log(workout.title);

            state.id = workout.id
            state.name = workout.title
            state.note = workout.note


            //let prevExerciseId =   workout.workoutExercises[0].id

            workout.workoutExercises.forEach(exercise => {

                // Flatten exercise data
                state.exercises.byId[exercise.id] = { ...exercise, setIds: [] }
                state.exercises.allIds.push(exercise.id)


                let setNo = 0
                let setIdArray = []

                exercise.sets.forEach(set => {
                    //if (exercise.id !== prevExerciseId) { setNo = 0 }

                    if (!set.warmup) { setNo = setNo + 1 }

                    // Flatten set data
                    state.sets.byId[set.id] = { ...set, exerciseId: exercise.id, setNo: set.warmup ? 0 : setNo, /* done: false  */ }  // sets from server doent have exerciseId
                    //state.sets.allIds.push(set.id)
                    setIdArray.push(set.id)
                    state.sets.byExerciseId[exercise.id] = setIdArray

                    // Update exercise with setId (???????????????????????????????????????????????????)
                    //state.exercises.byId[exercise.id].setIds.push(set.id)
                })

            })
            return state
        },
        clearWorkout(state, action) {
            return initialState;
        },
        setWorkoutName(state, action) {
            state.name = action.payload
            return state
        },
        addExercisesToWorkout(state, action) {
            const exercises = action.payload

            exercises.forEach(e => {
                state.exercises.byId[e.id] = e
                state.exercises.allIds.push(e.id)
            })

            return state
        },
        editWorkoutExerciseNote(state, action) {
            state.exercises.byId[action.payload.exerciseId] = action.payload.changedExercise
            return state
        },
        deleteExerciseFromWorkout(state, action) {
            const exerciseId = action.payload

            // delete sets associated with the exerciseId
            //let setIdsToBeDeleted = []
            for (const id in state.sets.byId) {
                if (state.sets.byId[id].exerciseId === exerciseId) {
                    //setIdsToBeDeleted.push(id)
                    delete state.sets.byId[id]
                }
            }
            //state.sets.allIds = state.sets.allIds.filter(id => setIdsToBeDeleted.includes(id))
            delete state.sets.byExerciseId[exerciseId]

            // delete exercise
            state.exercises.allIds.splice(state.exercises.allIds.indexOf(exerciseId), 1)
            delete state.exercises.byId[exerciseId]

            return state
        },
        moveExerciseUppWorkout(state, action) {
            const exerciseId = action.payload
            const index = state.exercises.allIds.findIndex(id => id === exerciseId)

            if (index === 0) return state

            const temp = state.exercises.allIds[index - 1]
            state.exercises.allIds[index - 1] = state.exercises.allIds[index]
            state.exercises.allIds[index] = temp

            return state
        },
        moveExerciseDownWorkout(state, action) {
            const exerciseId = action.payload
            const index = state.exercises.allIds.findIndex(id => id === exerciseId)

            if (index === state.exercises.allIds.length - 1) return state

            const temp = state.exercises.allIds[index + 1]
            state.exercises.allIds[index + 1] = state.exercises.allIds[index]
            state.exercises.allIds[index] = temp

            return state
        },
        addSetToWorkout(state, action) {
            //const set = action.payload
            //console.log("ADD REEDUCER ", set);
            const exerciseId = action.payload.exerciseId
            const warmup = action.payload.warmup

            let weight = 20
            let reps = 15

            // check if no sets yet -> add empty arrray
            if (state.sets.byExerciseId[exerciseId] === undefined) {
                state.sets.byExerciseId[exerciseId] = []
            } else if (!(state.sets.byExerciseId[exerciseId].length === 0)) {
                const lastSetId = state.sets.byExerciseId[exerciseId][state.sets.byExerciseId[exerciseId].length - 1]
                const lastSet = state.sets.byId[lastSetId]
                weight = lastSet.weight
                reps = lastSet.reps
            }

            const newSet = {
                id: generateId(),
                exerciseId: exerciseId,
                createdAt: new Date().toJSON(), // tää servulla?
                warmup: warmup,
                weight: weight,
                reps: reps
            }


            // add set to state
            state.sets.byId[newSet.id] = newSet
            state.sets.byExerciseId[exerciseId].push(newSet.id)

            // find all sets that have set.exerciseId
            const exerciseSets = state.sets.byExerciseId[exerciseId].map(setId => state.sets.byId[setId])

            // recalculate setNumbers
            let setNo = 0
            exerciseSets.forEach(set => {
                if (!set.warmup) { setNo = setNo + 1 }
                state.sets.byId[set.id] = { ...set, setNo: set.warmup ? 0 : setNo }
            })

            return state
        },
        addSetsToWorkout(state, action) { // millon tätä käytetään?
            const setsToAdd = action.payload

            setsToAdd.forEach(s => {
                state.sets.byId[s.id] = s
                state.sets.allIds.push(s.id)
            })

            return state
        },
        deleteSetFromWorkout(state, action) {
            const set = action.payload
            const setId = action.payload.id
            const exerciseId = action.payload.exerciseId

            //console.log("delete, ", setId, exerciseId)


            state.sets.byExerciseId[exerciseId].splice(state.sets.byExerciseId[exerciseId].indexOf(setId), 1)

            // find all sets that have set.exerciseId
            const exerciseSets = state.sets.byExerciseId[exerciseId].map(setId => state.sets.byId[setId])

            // recalculate setNumbers
            let setNo = 0
            exerciseSets.forEach(set => {
                if (!set.warmup) { setNo = setNo + 1 }
                state.sets.byId[set.id] = { ...set, setNo: set.warmup ? 0 : setNo }
            })


            delete state.sets.byId[setId] //= { ...set, exerciseId: null }

            console.log("STATE NOW: ", JSON.parse(JSON.stringify(state.sets)))

            return state
        },
        editSetFromWorkout(state, action) {
            console.log("EDIT SET REDUCER ", action.payload)

            const prev = state.sets.byId[action.payload.setId]
            state.sets.byId[action.payload.setId] = action.payload.changedSet

            if (prev.warmup !== action.payload.changedSet.warmup) {
                // find all sets that have set.exerciseId
                const exerciseSets = state.sets.byExerciseId[action.payload.changedSet.exerciseId].map(setId => state.sets.byId[setId])

                // recalculate setNumbers
                let setNo = 0
                exerciseSets.forEach(set => {
                    if (!set.warmup) { setNo = setNo + 1 }
                    state.sets.byId[set.id] = { ...set, setNo: set.warmup ? 0 : setNo }
                })
            }

            return state
        },
        copyToState() {
            // console.log("STATE: ", JSON.parse(JSON.stringify(state)))
        }
    }
})

export const {
    startEmptyWorkout,

    editWorkoutNote,
    setWorkout,
    clearWorkout,
    setWorkoutName,
    addExercisesToWorkout,
    editWorkoutExerciseNote,
    deleteExerciseFromWorkout,
    addSetToWorkout,
    deleteSetFromWorkout,
    addSetsToWorkout,
    editSetFromWorkout,
    copyToState,
    moveExerciseDownWorkout,
    moveExerciseUppWorkout
} = workoutSlice.actions

export default workoutSlice.reducer

export const saveWorkout = (isNew) => {
    return async (dispatch, getState) => {

        const exercisesFromState = getState().workout.exercises.allIds.map(exerciseId => {
            return getState().workout.exercises.byId[exerciseId]
        })

        const exercisesDTO = exercisesFromState.map(exercise => {
            console.log("exerciseDTO ", exercise);
            const setsFromState = getState().workout.sets.byExerciseId[exercise.id].map(setId => {
                return getState().workout.sets.byId[setId]
            })

            console.log("exerciseDTO sets ", setsFromState);


            const exerciseWithSets = {
                ...exercise,
                sets: setsFromState,
            }
            return exerciseWithSets
        })

        const newWorkoutObject = {
            userEmail: getState().user.email,
            title: getState().workout.name,
            createdAt: new Date().toJSON(), // servulla?
            note: getState().workout.note,
            workoutExercises: exercisesDTO
            // sets: setsDTO
        }

        console.log("ASYNC REDUCER ", newWorkoutObject)
       // console.log("ASYNC REDUCER isNew", isNew)

        let workoutResponse
        try {
            if (isNew) {
                workoutResponse = await workoutService.createNew(newWorkoutObject)
                console.log("ASYN REDUCER resp new", workoutResponse);
                dispatch(addWorkout(workoutResponse))
            } else {
                workoutResponse = await workoutService.update(getState().template.id, newWorkoutObject)
                console.log("ASYN REDUCER resp update", workoutResponse);
                dispatch(updateWorkout(workoutResponse.data))
            }
            toast.success('Workout saved!')
            dispatch(endWorkout())

        } catch (error) {
            console.log("CATHIIING ERROOOOOOOOOOOOOR");
            throw new Error(error)
            toast.error(error)
        }
    }
}

export const startWorkout = (isOngoing, workout) => {
    return (dispatch) => {
        if (isOngoing) {
            dispatch(resetWatches())
            dispatch(clearWorkout())
        }
        dispatch(startEmptyWorkout())
        //dispatch(startTimer())
        if (workout) {
            dispatch(setWorkout(workout))
        }
        console.log("WINDOW ", window.innerWidth);
        if (window.innerWidth < 900)  dispatch(expand())  
    }
}

export const endWorkout = () => {
    return (dispatch) => {
        dispatch(resetWatches())
        dispatch(clearWorkout())
        dispatch(unExpand())
    }
}

export const deleteWorkout = (workoutId) => {
    return async (dispatch) => {
        try {
            await workoutService.remove(workoutId)
            dispatch(removeWorkout(workoutId))
            toast.success("Workout deleted!");
        } catch (error) {
            toast.error(error.message)
        }
    }
}



