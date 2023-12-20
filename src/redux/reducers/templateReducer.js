import { createSlice } from "@reduxjs/toolkit"
import generateId from "../../utils/generateId"
import templateService from "../../services/templates"
import workoutService from "../../services/workouts"
import { addTemplate, updateTemplate } from "./templateLibraryReducer"
import { updateWorkout } from "./historyReducer"
import { toast } from "react-toastify"

const initialState = {
    id: null,
    name: "",
    note: "",
    exercises: { byId: {}, allIds: [] },
    //sets: { byId: {}, allIds: [] },
    sets: { byId: {}, byExerciseId: {}, }, // byExerciseId:{} ???
}

const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
        setTemplate(state, action) {
            console.log("setTemplate Reducer: ", action.payload);

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

                // prevExerciseId = exercise.id

            })
        },
        clearTemplate(state, action) {
            return initialState;
        },
        setTemplateName(state, action) {
            state.name = action.payload
            return state
        },
        addExercisesToTemplate(state, action) {
            const exercises = action.payload

            let number = 1
            exercises.forEach(e => {
                const exercise = { ...e, exerciseNumber: number}
                state.exercises.byId[e.id] = exercise
                state.exercises.allIds.push(e.id)
                number= number + 1
            })

            console.log("add ", JSON.parse(JSON.stringify(state)))

            return state
        },
        editTemplateNote(state, action) {
            state.note = action.payload
        },
        editTemplateExerciseNote(state, action) {
            const exerciseId = action.payload.exerciseId
            const changedExercise = action.payload.changedExercise

            state.exercises.byId[exerciseId] = changedExercise

            return state
        },
        deleteExerciseFromTemplate(state, action) {
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
        moveExerciseUppTemplate(state, action) {
            const exerciseId = action.payload
            const index = state.exercises.allIds.findIndex(id => id === exerciseId)

            if (index === 0) return state

            const temp = state.exercises.allIds[index - 1]
            state.exercises.allIds[index - 1] = state.exercises.allIds[index]
            state.exercises.allIds[index] = temp

            return state
        },
        moveExerciseDownTemplate(state, action) {
            const exerciseId = action.payload
            const index = state.exercises.allIds.findIndex(id => id === exerciseId)

            if (index === state.exercises.allIds.length - 1) return state

            const temp = state.exercises.allIds[index + 1]
            state.exercises.allIds[index + 1] = state.exercises.allIds[index]
            state.exercises.allIds[index] = temp

            return state
        },
        addSetToTemplate(state, action) {
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
                reps: reps,
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
        addSetsToTemplate(state, action) { // millon tätä käytetään?
            const setsToAdd = action.payload

            setsToAdd.forEach(s => {
                state.sets.byId[s.id] = s
                state.sets.allIds.push(s.id)
            })

            return state
        },
        deleteSetFromTemplate(state, action) {
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
        editSetFromTemplate(state, action) {
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
    editTemplateNote,
    setTemplate,
    clearTemplate,
    setTemplateName,
    editTemplateExerciseNote,
    addExercisesToTemplate,
    deleteExerciseFromTemplate,
    addSetToTemplate,
    deleteSetFromTemplate,
    addSetsToTemplate,
    editSetFromTemplate,
    copyToState,
    moveExerciseDownTemplate,
    moveExerciseUppTemplate
} = templateSlice.actions

export const saveTemplate = (isNew, isHistory, handleClose) => {
    console.log("hehooooo");
    return async (dispatch, getState) => {

        const exercisesFromState = getState().template.exercises.allIds.map(exerciseId => {
            return getState().template.exercises.byId[exerciseId]
        })

        const exercisesDTO = exercisesFromState.map(exercise => {
            const setsFromState = getState().template.sets.byExerciseId[exercise.id].map(setId => {
                return getState().template.sets.byId[setId]
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
            note: getState().template.note,
            workoutExercises: exercisesDTO 
        }

      

        console.log("ASYNC REDUCER ", newWorkoutObject)
        console.log("ASYNC REDUCER isNew", isNew)

        let templateResponse
        try {
            if (isNew) {
                templateResponse = await templateService.createNew(newWorkoutObject)
                dispatch(addTemplate(templateResponse))
            } else if (isHistory) {
                templateResponse = await workoutService.update(getState().template.id, newWorkoutObject)
                console.log("ASYN REDUCER resp", templateResponse);
                dispatch(updateWorkout(templateResponse))
            } else {
                templateResponse = await templateService.update(getState().template.id, newWorkoutObject)
                console.log("ASYN REDUCER resp", templateResponse);
                dispatch(updateTemplate(templateResponse))
            }
            handleClose()
            toast.success("Workout saved!")
            dispatch(clearTemplate())
        } catch (error) {
            toast.error(error.message)
           // throw error
            console.log("EEEEEEEEEERRRRRRRRROOOOOOOOOOOOOOOOOOOOOOORRR", error);
    
        }

        
       

        
    }
}

export default templateSlice.reducer