import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    workoutStarted: false,
    workoutTitle: "",
    exercises: [],
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
        addExercise: (state, action) => {

            const exerciseToAdd = action.payload
        
            /* const exercisesToAdd = action.payload.map(id => exercises.find(exercise => exercise.id === id));  
            exercisesToAdd.map(exercise => exercise["workout_exercise_details"] = [initialExerciseDetails])
            exercisesToAdd.map(exercise => exercise["exercise"] = exercise.id) */
            
            state.exercises.push(exerciseToAdd);
        },
        deleteExercise: (state, action) => {
            const id = action.payload
            state.exercises = state.exercises.filter(e => e.id !== id); // immutable, mutta ei tarvis täs
        },
        /* addSet: (state, action) => {
            //console.log("here in reducer");
            //console.log("state: ", JSON.parse(JSON.stringify(state)))
            //console.log("payload: ", action.payload);
            const exerciseId = action.payload.id
            const set = action.payload.set
            //console.log(id);
            //console.log(JSON.parse(JSON.stringify(state.exercises[state.exercises.findIndex(e => e.id === id)])))

            state.exercises[state.exercises.findIndex(e => e.id === exerciseId)].sets.push(set)

      
            //state.exercises[id]["workout_exercise_details"].push(initialExerciseDetails);
        }, */
        /* deleteSet(state, action) {
            const exerciseId = action.payload.exerciseId
            const setId = action.payload.setId
            console.log("payload", action.payload);
            console.log(JSON.parse(JSON.stringify(state.exercises)))
           // .splice(3, 1); // indeksi 3, 1 = poistetaan

            const exerciseIndex = state.exercises.findIndex(e => e.id === exerciseId)
            const setIndex = state.exercises[exerciseIndex].sets.findIndex(s => s.id === setId)

            state.exercises[exerciseIndex].sets.splice(setIndex, 1)
        },
        editSet(state, action) {
            console.log("editSet start, state:", JSON.parse(JSON.stringify(state.exercises)))
           
            const exerciseId = action.payload.exerciseId
            const setId = action.payload.setId
            const weight = action.payload.weight
            const reps = action.payload.reps
            const warmup = action.payload.warmup

            const exerciseIndex = state.exercises.findIndex(e => e.id === exerciseId)
            const setIndex = state.exercises[exerciseIndex].sets.findIndex(s => s.id === setId)

            state.exercises[exerciseIndex].sets[setIndex].weight = weight
            state.exercises[exerciseIndex].sets[setIndex].reps = reps
            state.exercises[exerciseIndex].sets[setIndex].warmup = warmup

            console.log("editSet end, state:", JSON.parse(JSON.stringify(state.exercises)))
        }, */

         




       /*  updateExerciseDetails: (state, action) => {
            const {exerciseIndex, index, name, value} = action.payload;
            state.exercises[exerciseIndex]["workout_exercise_details"][index][name] = value;
        },
        deleteExerciseDetails: (state, action) => {
            const {exerciseIndex, index} = action.payload;
            state.exercises[exerciseIndex]["workout_exercise_details"].splice(index, 1);
        }, */





        updateWorkoutTitle(state, action) {
            const title = action.payload
            console.log("update: ", title);
            state.workoutTitle = title
        },
        copyWorkout(state, action) {
            state.workoutStarted = true
            state.workoutTitle = action.payload.title
            state.exercises = action.payload.exercises
            //state.sets = action.payload.sets
        }
    }
})

export const {
    startWorkout,
    clearWorkout,
    addExercise,
    deleteExercise,
    updateWorkoutTitle,
    copyWorkout
} = workoutSlice.actions

export default workoutSlice.reducer