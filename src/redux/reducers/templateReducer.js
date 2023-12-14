/* import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //id: null,
    templateName: "New workout template",
    exercises: [],
    sets: [],
}

const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
        clearTemplate(state, action) {
            return initialState;
        },
        setTemplateName(state, action) {
            const title = action.payload
            state.templateName = title
            return state
        },
        addExercisesToTemplate(state, action) {
            const exercisesToAdd = action.payload
            exercisesToAdd.forEach(e => {
                state.exercises.push(e)
            })
            // console.log("STATE: ", JSON.parse(JSON.stringify(state)))
            return state
        },
        deleteExerciseFromTemplate(state, action) {
            const id = action.payload
            state.exercises = state.exercises.filter(e => e.id !== id)
            return state
        },
        addSetToTemplate(state, action) {
            state.sets.push(action.payload)
            return state
        },
        addSetsToTemplate(state, action) {
            const setsToAdd = action.payload
            setsToAdd.forEach(s => {
                state.sets.push(s)
            })
            console.log("STATE: ", JSON.parse(JSON.stringify(state)))
            return state
        },
        deleteSetFromTemplate(state, action) {
            console.log("DELETE REDUCER ");
            console.log(action.payload);

            const id = action.payload
      
            console.log("BEFORE ", JSON.parse(JSON.stringify(state)))
            state.sets = state.sets.filter(s => {
                console.log("FILTER ", JSON.parse(JSON.stringify(s)))
                console.log("BOOLEAN ", s.id, " ", id, " ", s.id !== id);
                return s.id !== id
            })
            console.log("AFTER ", JSON.parse(JSON.stringify(state)))
            return state
        },
        editSetFromTemplate(state, action) {
            const setId = action.payload.setId
            state.sets[state.sets.findIndex(set => set.id === setId)] = action.payload.changedSet
            //console.log("editSet end, state:", JSON.parse(JSON.stringify(state.exercises)))
            return state
        },
        copyToState() {

        }
    }
})

export const {
    clearTemplate,
    setTemplateName,
    addExercisesToTemplate,
    deleteExerciseFromTemplate,
    addSetToTemplate,
    deleteSetFromTemplate,
    addSetsToTemplate,
    editSetFromTemplate,
    copyToState
} = templateSlice.actions

export default templateSlice.reducer */



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "New workout template",
    note: "",
    exercises: { byId: {}, allIds: [] },
    sets: { byId: {}, allIds: [] },
    //sets: { byId: {}, byExerciseId:{}, }, // byExerciseId:{} ???
}

const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
        setTemplate(state, action) {
            console.log("setTemplate Reducer: ", action.payload);

            const workout = action.payload

            state.name = workout.title
            state.note = workout.note


            //let prevExerciseId =   workout.workoutExercises[0].id

            workout.workoutExercises.forEach(exercise => {

                // Flatten exercise data
                state.exercises.byId[exercise.id] = { ...exercise, setIds: [] }
                state.exercises.allIds.push(exercise.id)


                let setNo = 0

                exercise.sets.forEach(set => {
                    //if (exercise.id !== prevExerciseId) { setNo = 0 }

                    if (!set.warmup) { setNo = setNo + 1 }

                    // Flatten set data
                    state.sets.byId[set.id] = { ...set, exerciseId: exercise.id, setNo: set.warmup ? 0 : setNo }  // sets from server doent have exerciseId
                    state.sets.allIds.push(set.id)

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

            exercises.forEach(e => {
                state.exercises.byId[e.id] = e
                state.exercises.allIds.push(e.id)
            })

            return state
        },
        deleteExerciseFromTemplate(state, action) {
            const exerciseId = action.payload

            // delete sets associated with the exerciseId
            /* state.exercises.byId[exerciseId].setIds.forEach(setId => {
                delete state.sets.byId[setId];
                state.sets.allIds.splice(state.sets.allIds.indexOf(setId), 1)
            }) */
            let setIdsToBeDeleted = []
            for (const id in state.sets.byId) {
                if (state.sets.byId[id].exerciseId === exerciseId) {
                    setIdsToBeDeleted.push(id)
                    delete state.sets.byId[id]
                }
            }
            state.sets.allIds = state.sets.allIds.filter(id => setIdsToBeDeleted.includes(id))

            // delete exercise
            delete state.exercises.byId[exerciseId]
            state.exercises.allIds.splice(state.exercises.allIds.indexOf(exerciseId), 1)

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
            const set = action.payload

            // add set to state
            state.sets.byId[set.id] = set
            state.sets.allIds.push(set.id)

            // find all sets that have set.exerciseId
            const exerciseSets = []
            for (const id in state.sets.byId) {
                if (state.sets.byId[id].exerciseId === set.exerciseId) {
                    exerciseSets.push(state.sets.byId[id])
                }
            }

            // recalculate setNumbers
            let setNo = 0
            exerciseSets.forEach(set => {
                if (!set.warmup) { setNo = setNo + 1 }
                state.sets.byId[set.id] = { ...set, setNo: set.warmup ? 0 : setNo }
            })

            return state
        },
        addSetsToTemplate(state, action) {
            const setsToAdd = action.payload

            setsToAdd.forEach(s => {
                state.sets.byId[s.id] = s
                state.sets.allIds.push(s.id)
            })

            return state
        },
        deleteSetFromTemplate(state, action) {
            delete state.sets.byId[action.payload];
            state.sets.allIds.splice(state.sets.allIds.indexOf(action.payload), 1)
            return state
        },
        editSetFromTemplate(state, action) {
            state.sets.byId[action.payload.setId] = action.payload.changedSet
            return state
        },
        copyToState() {
            // console.log("STATE: ", JSON.parse(JSON.stringify(state)))
        }
    }
})

export const {
    setTemplate,
    clearTemplate,
    setTemplateName,
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

export default templateSlice.reducer