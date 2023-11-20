import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise, updateExercise } from '../../redux/reducers/exerciseLibraryReducer'

import exerciseService from '../../services/exercises'

import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { closeModal } from '../../redux/reducers/modalReducer'

import Form from './ExerciseForm'
import { toast } from 'react-toastify'

import BODY_PARTS from '../../utils/Bodyparts'


const EditExerciseModal = ({ exercise, handleClose }) => {
    const dispatch = useDispatch()

    const editExercise = async (exerciseName, targetMuscle) => {
        try {
            const updatedExercise = await exerciseService.update(exercise.id, exerciseName, targetMuscle) // miks servun pitäis lähettää takas? generoitu i?
            console.log('servu palautti: ', updatedExercise, ' dispatchataan storeen')
            dispatch(updateExercise(updatedExercise))
            handleClose()
            toast.success('Exercsise edited!')
        } catch (err) {
            toast.error(err.response.data.message)
        }

    }


    return (
        <>
            <h2>Edit existing exercise</h2>
            <Form
                exercise={exercise}
                handleClose={handleClose}
                handleSave={editExercise}
            />
        </>
    );
}

export default EditExerciseModal;