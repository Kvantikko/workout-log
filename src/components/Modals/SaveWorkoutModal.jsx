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

import { toast } from 'react-toastify'
import workoutService from '../../services/workouts'


const SaveWorkoutModal = ({ handleClose }) => {
    //console.log("RENDERING");
    //const [open, setOpen] = useState(false)
    //const workout = useSelector(state => state.workout)
    const workoutName = useSelector(state => state.workout.workoutTitle)
    console.log("WORKOUTNAME ", workoutName);
    const email = useSelector(state => state.user.email)
    const exercises = useSelector(state => state.exercises)
    const sets = useSelector(state => state.sets)
    const [input, setInput] = useState(workoutName)
    const [inputError, setInputError] = useState('')


    const dispatch = useDispatch()

    const saveWorkoutToDb = async () => {
        if (input === '') {
            setInputError('required')
            return
        }

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
        //console.log(newWorkoutObject);

        try {
            const response = await workoutService.createNew(newWorkoutObject)
            // pistä servulata palautettu objekti stateen?
            toast.success('Workout saved!')
            dispatch(addToHistory(newWorkoutObject))
            dispatch(clearWorkout())
            dispatch(clearExercises())
            dispatch(clearSets())
            dispatch(stopWatch())
            handleClose()
        } catch (err) {
            toast.error(err.response.data.message)
        }
    }

    return (
        <>
            <h3>
                Finish ongoing workout?
            </h3>
            <TextField
                variant="outlined"
                size='small'
                label="Workout name *"
                value={input}
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
                onClick={() => setInputError('')}
                error={!(inputError === '')}
                helperText={inputError}
            />
            <Box
                display={'flex'}
                flexDirection={'column'}
                gap={1.5}
            >
                <Button variant="outlined" onClick={handleClose}>Keep logging</Button>
                <Button variant="contained" onClick={saveWorkoutToDb}>Save to database</Button>

            </Box>
        </>
    )
}

export default SaveWorkoutModal