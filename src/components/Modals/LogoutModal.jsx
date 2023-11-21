import InfoIcon from '@mui/icons-material/Info'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Stack, Typography } from '@mui/material'

const LogoutModal = () => {
    return (
        <>
            <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                <HelpOutlineIcon color='info' fontSize='large'/>
                <Typography variant='h4'>Log out?</Typography>
            </Stack>
            <Typography>
                Are you sure you want to log out?
            </Typography>
        </>
    );
}

export default LogoutModal;