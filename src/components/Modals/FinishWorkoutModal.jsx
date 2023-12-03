import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise, removeExercise } from '../../redux/reducers/exerciseLibraryReducer'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import exerciseService from '../../services/exercises'

import BasicModal from './BasicModal'

import { clearWorkout } from "../../redux/reducers/workoutReducer"
import { clearSets } from "../../redux/reducers/setReducer"
import { clearExercises } from '../../redux/reducers/exerciseReducer'


import { Box, Typography, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { stopWatch } from '../../redux/reducers/stopWatchReducer'

import { addToHistory } from '../../redux/reducers/historyReducer'

import { toast } from 'react-toastify'
import workoutService from '../../services/workouts'
import { resetWorkout } from '../../redux/reducers/navReducer'
//import { useNavigate } from 'react-router-dom'


const FinishWorkoutModal = ({ open, onClose }) => {
    console.log("Rendering FinishWorkoutModal");
    //const [open, setOpen] = useState(false)
    //const workout = useSelector(state => state.workout)
    const workoutName = useSelector(state => state.workout.workoutTitle)
  
    const email = useSelector(state => state.user.email)
    const exercises = useSelector(state => state.exercises)
    const sets = useSelector(state => state.sets)

    const [input, setInput] = useState(workoutName)
    const [inputError, setInputError] = useState('')


    const dispatch = useDispatch()
   // const navigate = useNavigate()

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
           // console.log('servu palautti: ', response.data, ' dispatchataan storeen')
            // pistä servulata palautettu objekti stateen?

            dispatch(addToHistory(response.data))
            dispatch(clearWorkout())
            dispatch(clearExercises())
            dispatch(clearSets())
            dispatch(stopWatch())
            dispatch(resetWorkout())
            //navigate('/')
            toast.success('Workout saved!')
            handleClose()
        } catch (err) {
            toast.error(err.response.data.message)
        }
    }

    const getContent = () => {
        return (
            <>
            <TextField
                fullWidth
                id='workout title'
                variant="outlined"
                size='medium'
                label="Workout name"
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
                sx={{ paddingBottom: 2 }}
            />
            </>
        )

    }

    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="Finish workout?"
            //subTitle="Discard ongoing workout?"
            confirmButtonText={'Save'}
            cancelButtonText={'Keep logging'}
            content={getContent()}
            onSubmit={saveWorkoutToDb}
        />

    )
}

export default FinishWorkoutModal