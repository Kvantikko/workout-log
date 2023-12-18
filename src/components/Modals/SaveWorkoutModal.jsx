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


const SaveWorkoutModal = ({ open, onClose, onSubmit, type, title, editVipu, workout }) => {
    console.log("Rendering FinishWorkoutModal");

    let modalTitle
    switch (type) {
        case "active":
            modalTitle = "Finish workout?"
            break;
        case "template":
            modalTitle = "Save template?"
            break;
        default:
            throw new Error('Component must have a type prop specified!');
    }

    const dispatch = useDispatch()

    const saveWorkoutToDb = async () => {

        try {
            switch (type) {
                case "active":
                    //dispatch(saveWorkout())

                    /*    response = await workoutService.createNew(newWorkoutObject)
                       dispatch(addToHistory(response.data))
                       dispatch(clearWorkout())
                       dispatch(clearExercises())
                       dispatch(clearSets())
                       dispatch(stopWatch())
                      */

                    toast.success('Workout saved!')
                    onClose()
                    onSubmit()
                    break;
                case "template":
                    if (editVipu) {
                        dispatch(saveTemplate(!editVipu))
                    } else {
                        dispatch(saveTemplate(!editVipu))
                    }
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
            subTitle="Save workout"
            confirmButtonText={'Save'}
            cancelButtonText={'Cancel'}
            onSubmit={saveWorkoutToDb}
        />
    )
}

export default SaveWorkoutModal