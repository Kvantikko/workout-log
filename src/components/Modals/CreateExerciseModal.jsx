import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise } from '../../redux/reducers/exerciseLibraryReducer'

import ExerciseForm from '../Forms/ExerciseForm'


import exerciseService from '../../services/exercises'

import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'

import { toast } from 'react-toastify'




const CreateExerciseModal = ({ handleClose, confirmButton }) => {
    console.log("rendering CreateExerciseModal");
    const dispatch = useDispatch()

    const saveExercise = async (exerciseName, targetMuscle) => {
        try {
            const newExercise = await exerciseService.createNew(exerciseName, targetMuscle) // miks servun pitäis lähettää takas? generoitu i?
            console.log('servu palautti: ', newExercise, ' dispatchataan storeen')
            dispatch(createExercise(newExercise))
            toast.success('New exercsise created!')
            handleClose()
        } catch (err) {
            toast.error(err.response)
        }

    }

    return (
        <>
            <Stack direction={'row'} spacing={0} justifyContent={'center'}>
                <Typography variant='h5'>Create a new exercise</Typography>
            </Stack>
            <ExerciseForm
                handleClose={handleClose}
                handleSave={saveExercise}
                confirmButton={confirmButton}
            />
        </>
    );
}

export default CreateExerciseModal