/* import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    workoutStarted: false,
    workoutTitle: "",
}

const workoutSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        startWorkout(state) {
            //console.log(JSON.parse(JSON.stringify(state)))
            state.workoutStarted = true
            //console.log(JSON.parse(JSON.stringify(state)))
        },
        clearWorkout(state) {
            return initialState;
        },
        updateWorkoutTitle(state, action) {
            const title = action.payload
            state.workoutTitle = title
        },
        copyWorkout(state, action) {
            state.workoutStarted = true
            state.workoutTitle = action.payload.title
        }
    }
})

export const {
    startWorkout,
    clearWorkout,
    updateWorkoutTitle,
    copyWorkout
} = workoutSlice.actions

export default workoutSlice.reducer */




import { createSlice } from "@reduxjs/toolkit"
import generateId from "../../utils/generateId"
import workoutService from "../../services/workouts"
import { addTemplate, updateTemplate } from "./templateLibraryReducer"

const initialState = {
    workoutStarted: false,
    
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
        startWorkout(state) {
            //console.log(JSON.parse(JSON.stringify(state)))
            state.workoutStarted = true
            //console.log(JSON.parse(JSON.stringify(state)))
        },


        setWorkout(state, action) {
          

            const workout = action.payload

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
        deleteSetFromTWorkout(state, action) {
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
    startWorkout,

    setWorkout,
    clearWorkout,
    setWorkoutName,
    addExercisesToWorkout,
    deleteExerciseFromWorkout,
    addSetToWorkout,
    deleteSetFromWorkout,
    addSetsToWorkout,
    editSetFromWorkout,
    copyToState,
    moveExerciseDownWorkout,
    moveExerciseUppWorkout
} = workoutSlice.actions

export const saveWorkout = (isNew) => {
    return async (dispatch, getState) => {

        const exercisesFromState = getState().workout.exercises.allIds.map(exerciseId => {
            return getState().workout.exercises.byId[exerciseId]
        })

        const exercisesDTO = exercisesFromState.map(exercise => {
            const setsFromState = getState().workout.sets.byExerciseId[exercise.id].map(setId => {
                return getState().workout.sets.byId[setId]
            })

            //delete exercise.setIds

            const exerciseWithSets = {
                ...exercise,
                sets: setsFromState,
            }
            return exerciseWithSets
        }) 
            
        const newWorkoutObject = {
            userEmail: getState().user.email,
            title:  getState().template.name,
            createdAt: new Date().toJSON(), // servulla?
            note: "",
            workoutExercises: exercisesDTO 
        }

        console.log("ASYNC REDUCER ", newWorkoutObject)
        console.log("ASYNC REDUCER isNew", isNew)

        let workoutResponse
        if (isNew) {
            workoutResponse = await workoutService.createNew(newWorkoutObject)
            dispatch(addTemplate(templateResponse))
        } else {
            workoutResponse = await workoutService.update(getState().template.id, newWorkoutObject)
            console.log("ASYN REDUCER resp", workoutResponse);
            dispatch(updateTemplate(workoutResponse))
        }

        dispatch(clearTemplate())
    }
}

export default workoutSlice.reducer