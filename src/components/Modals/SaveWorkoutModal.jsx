import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise, removeExercise, updateExercise } from '../../redux/reducers/exerciseLibraryReducer'
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
import templateService from '../../services/templates'
import { createTemplate, updateTemplate, } from '../../redux/reducers/templateLibraryReducer'
import { clearTemplate, } from '../../redux/reducers/templateReducer'
import { resetWorkoutPath } from '../../redux/reducers/navReducer'
//import { useNavigate } from 'react-router-dom'


const SaveWorkoutModal = ({ open, onClose, onSubmit, type, title, editVipu, workout }) => {
    console.log("Rendering FinishWorkoutModal");
    //const [open, setOpen] = useState(false)
    //const workout = useSelector(state => state.workout)

    const email = useSelector(state => state.user.email)
    let workoutName
    let exercises
    let sets
    let modalTitle
    switch (type) {
        case "active":
            workoutName = useSelector(state => state.workout.workoutTitle ? state.workout.workoutTitle : "")
            exercises = useSelector(state => state.exercises)
            sets = useSelector(state => state.sets)
            modalTitle = "Finish workout?"
            break;
        case "template":
            workoutName = useSelector(state => state.template.templateName)
            exercises = useSelector(state => state.template.exercises)
            sets = useSelector(state => state.template.sets)
            modalTitle = "Save template?"
            break;
        default:
            throw new Error('Component must have a type prop specified!');
    }

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


        try {
            let response
            switch (type) {
                case "active":
                    response = await workoutService.createNew(newWorkoutObject)
                    // console.log('servu palautti: ', response.data, ' dispatchataan storeen')
                    // pistä servulata palautettu objekti stateen?

                    dispatch(addToHistory(response.data))
                    dispatch(clearWorkout())
                    dispatch(clearExercises())
                    dispatch(clearSets())
                    dispatch(stopWatch())
                    //dispatch(resetWorkout())
                    //navigate('/')
                    toast.success('Workout saved!')
                    onClose()
                    onSubmit()
                    break;
                case "template":
                    if (editVipu) {
                        response = await templateService.update(workout?.id, newWorkoutObject)
                        dispatch(updateTemplate(response))
                    } else {
                        response = await templateService.createNew(newWorkoutObject)
                        dispatch(createTemplate(response.data))
                    }
                   
                    //console.log('servu palautti: ', response.data, ' dispatchataan storeen')

                    
                    dispatch(clearTemplate())


                    //navigate('/')
                    toast.success('Template saved!')
                    onClose()
                    onSubmit()
                    break;
                default:
                    throw new Error('Component must have a type prop specified!');
            }

        } catch (err) {
            toast.error(err.response)
        }
    }

    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title={modalTitle}
            //subTitle="Discard ongoing workout?"
            confirmButtonText={'Save'}
            cancelButtonText={'Cancel'}
            onSubmit={saveWorkoutToDb}
        >
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
        </BasicModal>

    )
}

export default SaveWorkoutModal