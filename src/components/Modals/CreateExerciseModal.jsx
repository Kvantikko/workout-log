import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise, addExercise } from '../../redux/reducers/exerciseLibraryReducer'

import ExerciseForm from './ExerciseForm'


import exerciseService from '../../services/exercises'

import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

import { style } from './Helper'

import AddIcon from '@mui/icons-material/Add';
import BODY_PARTS from '../../utils/Bodyparts'
import Exercise from '../Exercises/Exercise'




const CreateExerciseModal = ({ handleClose }) => {
    const dispatch = useDispatch()

    const saveExercise = async (exerciseName, targetMuscle) => {
        console.log("saving");
        //event.preventDefault() // ilman tätä clientti lähettää uusia luonti pyyntjö palvelimelle loputtomiin, console error
        const newExercise = await exerciseService.createNew(exerciseName, targetMuscle) // miks servun pitäis lähettää takas? generoitu i?
        console.log('servu palautti: ', newExercise, ' dispatchataan storeen')
        dispatch(addExercise(newExercise))
        handleClose()
    }

    return (
        <div>
            <Stack sx={style}>
                <h2>Add a new exercise</h2>
                <ExerciseForm
                    handleClose={handleClose}
                    handleSave={saveExercise}
                />
            </Stack>
        </div>
    );
}

export default CreateExerciseModal