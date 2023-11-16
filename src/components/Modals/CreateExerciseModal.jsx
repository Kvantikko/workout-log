import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise } from '../../redux/reducers/exerciseLibraryReducer'

import ExerciseForm from './ExerciseForm'


import exerciseService from '../../services/exercises'

import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'

import { style } from './Helper'

import AddIcon from '@mui/icons-material/Add';
import BODY_PARTS from '../../utils/Bodyparts'
import Exercise from '../Exercise/Exercise'




const CreateExerciseModal = ({ handleClose }) => {
    const dispatch = useDispatch()

    const saveExercise = async (exerciseName, targetMuscle) => {
        

        const newExercise = await exerciseService.createNew(exerciseName, targetMuscle) // miks servun pitäis lähettää takas? generoitu i?
        console.log('servu palautti: ', newExercise, ' dispatchataan storeen')
        dispatch(createExercise(newExercise))
        handleClose()
    }

    return (
        <>
            <Typography variant='h5'>Add a new exercise</Typography>
            <ExerciseForm
                handleClose={handleClose}
                handleSave={saveExercise}
            />
        </>
    );
}

export default CreateExerciseModal