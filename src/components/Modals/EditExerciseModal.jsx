import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise, updateExercise } from '../../redux/reducers/exerciseLibraryReducer'

import exerciseService from '../../services/exercises'

import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'
import { closeModal } from '../../redux/reducers/modalReducer'

import ExerciseForm from '../Forms/ExerciseForm'
import { toast } from 'react-toastify'

import BODY_PARTS from '../../utils/Bodyparts'


const EditExerciseModal = ({ exercise, handleClose, confirmButton }) => {
    const dispatch = useDispatch()

    const editExercise = async (exerciseName, targetMuscle) => {
        try {
            const updatedExercise = await exerciseService.update(exercise.id, exerciseName, targetMuscle) // miks servun pitäis lähettää takas? generoitu i?
            console.log('servu palautti: ', updatedExercise, ' dispatchataan storeen')
            dispatch(updateExercise(updatedExercise))
            toast.success('Exercsise edited!')
            handleClose()
        } catch (err) {
            toast.error(err.response)
        }

    }


    return (
        <>
            <Stack direction={'row'} spacing={0} justifyContent={'center'}>
                <Typography variant='h5'>Edit exercise</Typography>
            </Stack>
            <ExerciseForm
                exercise={exercise}
                handleSave={editExercise}
                confirmButton={confirmButton}
            />
        </>
    );
}

export default EditExerciseModal;