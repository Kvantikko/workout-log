import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning';
import BasicModal from './BasicModal';

const CopyWorkoutModal = ({ open, onClose, copyFunction }) => {

    /*  <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                 <WarningIcon color='warning' fontSize='large' />
                 <Typography variant='h4'>Warning!</Typography>
             </Stack>
             <Typography>
                 You have a workout in progress,
                 are you sure you want to override the current workout?
             </Typography> */

    return (
        <>


            <BasicModal
                open={open}
                onClose={onClose}
                title="Workout in progress!"
                subTitle="You have a workout in progress.
                Are you sure you want to override the current workout?"
                confirmButtonText={'Yes'}
                cancelButtonText={'No'}
                //content={getContent()}
                onSubmit={copyFunction}
            />
        </>
    )
}

export default CopyWorkoutModal