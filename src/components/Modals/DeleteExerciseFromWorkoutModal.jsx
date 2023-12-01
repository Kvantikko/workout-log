import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'



import { Box, Button, Modal, TextField, Stack, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'



import WarningIcon from '@mui/icons-material/Warning'
import BasicModal from './BasicModal'

const DeleteExerciseFromWorkoutModal = ({ open, onClose, confirmFunction }) => {
    console.log("Rendering DeleteExerciseFromWorkoutModal");


    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="Delete exercise?"
            subTitle="This action cannot be undone."
            confirmButtonText={'Yes'}
            cancelButtonText={'No'}
            //content={getContent()}
            onSubmit={confirmFunction}
        />

    )
}

export default DeleteExerciseFromWorkoutModal