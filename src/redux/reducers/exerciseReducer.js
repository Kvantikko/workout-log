import { createSlice } from "@reduxjs/toolkit";

const workoutSlice = createSlice({
    name: 'exercises',
    initialState: [],
    reducers: {
        clearExercises(state) {
            state = []
            return state
        },
        addExercises: (state, action) => {
            //console.log();
            const exercisesToAdd = action.payload
            exercisesToAdd.forEach(e => {
                state.push(e)
            })

            console.log("STATE: ", JSON.parse(JSON.stringify(state)))
            return state
        },
        deleteExercise: (state, action) => {
            const id = action.payload
            state = state.filter(e => e.id !== id); // immutable, mutta ei tarvis täs
            return state
        },
        copyExercises(state, action) {
            state = action.payload
            return state
        },
        editExerciseNote(state, action) {

            const exerciseId = action.payload.exerciseId


            state[state.findIndex(exercise => exercise.id === exerciseId)] = action.payload.changedExercise
            //console.log("editSet end, state:", JSON.parse(JSON.stringify(state.exercises)))
            return state
        },
        moveExerciseUpp(state, action) {
            console.log("REDUUUUUUUUUUUUCER UP");
            const exerciseId = action.payload
            //console.log(action.payload)

            const index = state.findIndex(exercise => exercise.id === exerciseId)

            if (index === 0) return state

            const temp = state[index - 1]
            state[index - 1] = state[index]
            state[index] = temp

            return state
        },
        moveExerciseDown(state, action) {
            console.log("REDUUUUUUUUUUUUCER DOWN");
            const exerciseId = action.payload
            //console.log(action.payload)

            const index = state.findIndex(exercise => exercise.id === exerciseId)

            if (index === state.length - 1) return state

            const temp = state[index + 1]
            state[index + 1] = state[index]
            state[index] = temp

            return state
        },
    }
})

export const {
    clearExercises,
    addExercises,
    deleteExercise,
    copyExercises,
    editExerciseNote,
    moveExerciseUpp,
    moveExerciseDown
} = workoutSlice.actions

export default workoutSlice.reducer