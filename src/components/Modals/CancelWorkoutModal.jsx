import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'



import { Box, Button, Modal, TextField, Stack, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'



import WarningIcon from '@mui/icons-material/Warning'

const CancelWorkoutModal = ({ handleClose }) => {
    
    return (
        <>
            <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                <WarningIcon color='warning' fontSize='large' />
                <Typography variant='h4'>Warning!</Typography>
            </Stack>
            <Typography>
                Discard ongoing workout?
            </Typography>
        </>
    )
}

export default CancelWorkoutModal