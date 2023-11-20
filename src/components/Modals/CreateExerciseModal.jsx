import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise } from '../../redux/reducers/exerciseLibraryReducer'

import ExerciseForm from './ExerciseForm'


import exerciseService from '../../services/exercises'

import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'

import { toast } from 'react-toastify'




const CreateExerciseModal = ({ handleClose }) => {
    console.log("rendering CreateExerciseModal");
    const [error, setError] = useState()

    const dispatch = useDispatch()


    const saveExercise = async (exerciseName, targetMuscle) => {
        try {
            const newExercise = await exerciseService.createNew(exerciseName, targetMuscle) // miks servun pitäis lähettää takas? generoitu i?
            console.log('servu palautti: ', newExercise, ' dispatchataan storeen')
            dispatch(createExercise(newExercise))
            handleClose()
            toast.success('New exercsise saved!')
        } catch (err) {
            toast.error(err.response.data.message)
            setError(err.response.data.message)
        }
        
    }

    return (
        <>
            <Typography variant='h5'>Add a new exercise</Typography>
            <ExerciseForm
                handleClose={handleClose}
                handleSave={saveExercise}
                error={error}
            />
        </>
    );
}

export default CreateExerciseModal