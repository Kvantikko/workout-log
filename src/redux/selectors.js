import { createSelector } from 'reselect';

const selectExerciseSlice = state => state.template.exercises
const selectSetSlice = state => state.template.sets // allIds

export const selectAllExercises = createSelector(
    [selectExerciseSlice],
    exercises => {
        console.log("this selector should be memoized")
        return exercises.allIds.map(id => exercises.byId[id])
    }
)

export const selectFilteredSets = createSelector( 
    [selectSetSlice, (_, exerciseId) => exerciseId],
    (sets, exerciseId) => {
        console.log("this selector should be memoized too")
        return sets.allIds
            .map(id => sets.byId[id])
            .filter(set => { return set.exerciseId === exerciseId })
            //.map(set => set.id) // uusi!
    }
)