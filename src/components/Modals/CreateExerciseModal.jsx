import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise } from '../../redux/reducers/exerciseLibraryReducer'

import ExerciseForm from '../Forms/ExerciseForm'
import BasicModal from './BasicModal'


import exerciseService from '../../services/exercises'

import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'

import { toast } from 'react-toastify'




const CreateExerciseModal = ({ open, onClose, confirmFunction, handleClose, confirmButton }) => {
    console.log("Rendering CreateExerciseModal");
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


            <BasicModal
                open={open}
                onClose={onClose}
                title="Create a new exercise"
                //subTitle="Discard ongoing workout?"
                confirmButtonText={'Create'}
                //cancelButtonText={'Keep logging'}
                hideConfirmButton={true}
            //onSubmit={confirmFunction}
            >
                <ExerciseForm
                    handleClose={handleClose}
                    handleSave={saveExercise}
                    confirmButton={confirmButton}
                />
            </BasicModal>
        </>
    );
}

export default CreateExerciseModal