import InfoIcon from '@mui/icons-material/Info'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Stack, Typography } from '@mui/material'

import BasicModal from './BasicModal';

const LogoutModal = ({ open, onClose, confirmFunction }) => {

    {/*             <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                <HelpOutlineIcon color='info' fontSize='large' />
                <Typography variant='h4'>Log out?</Typography>
            </Stack>
            <Typography>
                
            </Typography> */}


    return (
        <>
            <BasicModal
                open={open}
                onClose={onClose}
                title="Logout?"
                subTitle="Are you sure you want to log out?"
                confirmButtonText={'Yes'}
                cancelButtonText={'No'}
                //content={getContent()}
                onSubmit={confirmFunction}
            />
        </>


    );
}

export default LogoutModal;