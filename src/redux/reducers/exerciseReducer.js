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
            console.log("REDUUUUUUUUUUUUCER");
            const exerciseId = action.payload.exerciseId
            console.log(action.payload);  
            
            state[state.findIndex(exercise => exercise.id === exerciseId)] = action.payload.changedExercise
            //console.log("editSet end, state:", JSON.parse(JSON.stringify(state.exercises)))
            return state
        }
    }
})

export const {
    clearExercises,
    addExercises,
    deleteExercise,
    copyExercises,
    editExerciseNote
} = workoutSlice.actions

export default workoutSlice.reducer