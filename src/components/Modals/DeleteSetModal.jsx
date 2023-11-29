import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'



import { Box, Button, Modal, TextField, Stack, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'



import WarningIcon from '@mui/icons-material/Warning'
import BasicModal from './BasicModal'

const DeleteSetModal = ({ open, onClose, confirmFunction }) => {


    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="Delete set?"
            subTitle="The set is marked as done. Are you sure you want to delete it?"
            confirmButtonText={'Yes'}
            cancelButtonText={'No'}
            //content={getContent()}
            onSubmit={confirmFunction}
        />

    )
}

export default DeleteSetModal