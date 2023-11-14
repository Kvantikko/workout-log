import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise, removeExercise } from '../../redux/reducers/exerciseLibraryReducer'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import exerciseService from '../../services/exercises'


import { clearWorkout } from "../../redux/reducers/workoutReducer"
import { clearSets } from "../../redux/reducers/setReducer"
import { clearExercises } from '../../redux/reducers/exerciseReducer'


import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { stopWatch } from '../../redux/reducers/stopWatchReducer'

import { addToHistory } from '../../redux/reducers/historyReducer'


import workoutService from '../../services/workouts'


const SaveWorkoutModal = ({ handleClose }) => {
    console.log("RENDERING");
    const [open, setOpen] = useState(false)

    const workout = useSelector(state => state.workout)
    const email = useSelector(state => state.user.email)
    const exercises = useSelector(state => state.exercises)
    const sets = useSelector(state => state.sets)
    const [input, setInput] = useState("")

    const dispatch = useDispatch()

    const saveWorkoutToDb = async () => {

        const newExercises = exercises.map(exercise => {
            const exerciseWithSets = {
                ...exercise,
                sets: sets.filter(set => set.exerciseId === exercise.id)
            }
            return exerciseWithSets
        })

        const newWorkoutObject = {
            userEmail: email,
            title: input,
            createdAt: new Date().toJSON(),
            note: "",
            workoutExercises: newExercises
        }
        console.log(newWorkoutObject);
        const response = await workoutService.createNew(newWorkoutObject)
        console.log("response: ", response);
        // pistä servulata palautettu objekti stateen?
        if (response.status === 200) {
            dispatch(clearWorkout())
            dispatch(clearExercises())
            dispatch(clearSets())
            dispatch(stopWatch())

            dispatch(addToHistory(newWorkoutObject))
        }
        handleClose()
    }

    return (
        <Stack /* sx={style} */  >
            <h3>
                Finish ongoing workout?
            </h3>
            <TextField
                variant="outlined"
                label="Workout name"
                onChange={(event) => {
                    //console.log(event.target.value)
                    setInput(event.target.value)
                }}
                onKeyDown={e => {
                    if (e.code === 'enter' && e.target.value) {
                        setSelected(e.target.value)
                        //setAutoCompleteValue(autoCompleteValue.concat(e.target.value));
                    }
                }}
            />
            <Stack direction='row'>
                <Button variant="outlined" onClick={handleClose}>No, keep logging</Button>
                <Button variant="contained" onClick={saveWorkoutToDb}>Yes, save to database</Button>

            </Stack>
        </Stack>
    )
}

export default SaveWorkoutModal