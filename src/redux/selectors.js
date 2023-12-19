import { createSelector } from 'reselect';

const selectTemplateExerciseSlice = state => state.template.exercises.allIds
const selectWorkoutExerciseSlice = state => state.workout.exercises.allIds
const selectSetSlice = state => state.template.sets

export const selectAllTemplateExercises = createSelector(
    [selectTemplateExerciseSlice],
    exercises => {
        console.log("this selector should be memoized")
        return exercises //.allIds.map(id => exercises.byId[id])
    }
)

export const selectAllWorkoutExercises = createSelector(
    [selectWorkoutExerciseSlice],
    exercises => {
        console.log("this selector should be memoized")
        return exercises //.allIds.map(id => exercises.byId[id])
    }
)

export const selectFilteredSetIds = createSelector( 
    [selectSetSlice, (_, exerciseId) => exerciseId],
    (sets, exerciseId) => {
        console.log("this selector should be memoized too")
        return sets.allIds
            .map(id => sets.byId[id])
            .filter(set => { return set.exerciseId === exerciseId })
            .map(set => set.id) // uusi!
    }
)