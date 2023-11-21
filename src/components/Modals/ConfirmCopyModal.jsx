import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning';

const ConfirmCopyModal = ({ handleClose, copyFunction }) => {
    return (
        <>
            <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                <WarningIcon color='warning' fontSize='large' />
                <Typography variant='h4'>Warning!</Typography>
            </Stack>
            <Typography>
                You have a workout in progress,
                are you sure you want to override the current workout?
            </Typography>
        </>
    )
}

export default ConfirmCopyModal