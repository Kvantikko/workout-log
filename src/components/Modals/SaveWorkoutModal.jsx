import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise, removeExercise, updateExercise } from '../../redux/reducers/exerciseLibraryReducer'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

import BasicModal from './BasicModal'
import { Box, Typography, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

import { toast } from 'react-toastify'

import { addTemplate, updateTemplate, } from '../../redux/reducers/templateLibraryReducer'
import { clearTemplate, saveTemplate, } from '../../redux/reducers/templateReducer'
import { resetWorkoutPath } from '../../redux/reducers/navReducer'
import { saveWorkout } from '../../redux/reducers/workoutReducer'


const SaveWorkoutModal = ({ open, onClose, onSubmit, type, title, editVipu, workout }) => {
    console.log("Rendering SaveWorkoutModal ", type);

    let modalTitle
    switch (type) {
        case "active":
            modalTitle = "Finish workout?"
            break;
        case "template":
            modalTitle = "Save workout?"
            break;
        case "history":
            modalTitle = "Save workout?"
            break;
        default:
            throw new Error('Component must have a type prop specified!');
    }

    const dispatch = useDispatch()

    const saveWorkoutToDb = async () => {
        console.log("SAVE FUNC ", type);
        try {
            switch (type) {
                case "active":
                    dispatch(saveWorkout(!editVipu))
                    onClose()
                    onSubmit()
                    break;
                case "template":
                    dispatch(saveTemplate(!editVipu))
                    onClose()
                    onSubmit()
                    break;
                case "history":
                    console.log("case history");
                    dispatch(saveTemplate(!editVipu, true))
                    onClose()
                    onSubmit()
                    break;
                default:
                    throw new Error('Component must have a type prop specified!');
            }
            toast.success('Workout saved!')
        } catch (err) {
            toast.error(err.response)
        }
    }

    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title={modalTitle}
            subTitle=" "
            confirmButtonText={'Yes'}
            cancelButtonText={'Cancel'}
            onSubmit={saveWorkoutToDb}
        />
    )
}

export default SaveWorkoutModal