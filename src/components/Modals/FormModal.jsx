import { useState, useEffect } from 'react'
import { Box, Button, MenuItem, Toolbar, IconButton, Modal, Typography, Stack } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { unExpand } from '../../redux/reducers/drawerReducer'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    height: { xs: '100svh', md: 'auto' },
    maxHeight: '100%',
    maxWidth: 600,
    bgcolor: '#222326', //'background.paper',
    //border: '2px solid #000',
    borderRadius: 4,
    boxShadow: 24,
    padding: { xs: 2, sm: 3 },
    //paddingRight: { xs: 2, sm: 3 },
    //overflow: 'scroll'
    display: 'flex',
    flexDirection: 'column'
}

const styleMobile = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100vw', sm: '70vw' },
    height: { xs: '100vh', sm: '90%' },
    //maxHeight: '100%',
    // maxWidth: 550,
    bgcolor: 'background.paper',
    //border: '2px solid #000',
    boxShadow: 24,
    //p: { xs: 2, sm: 4},

    //overflow: 'scroll'
    //display: 'flex',
    //flexDirection: 'column'
};

const FormModal = ({
    open,
    onClose,
    onSubmit,
    children,
    hideConfirmButton,
    title,

    confirmButtonText,
    cancelButtonText,
    confirmButtonColor,
    modalType,
    confirmFunction,
    object,
    handleMenuClose }) => {

    const isSmallScreen = useMediaQuery('(max-width:900px)')
    const isWorkoutActive = useSelector(state => state.workout.workoutStarted)
    const prevUrl = window.location.href

    const dispatch = useDispatch()

    useEffect(() => {
        window.history.pushState("object or string", "Title", `${prevUrl}#modal`)
        window.onpopstate = (event) => onClose()
        return(() => {
            window.history.replaceState("object or string", "Title", `${prevUrl}`)
            window.onpopstate = isWorkoutActive ? () => dispatch(unExpand()) : null 
        })
    }, [])

    return (
        <Modal
            open={open}
            onClose={onClose}
            BackdropProps={{
                timeout: 500,
                sx: {
                    backdropFilter: 'blur(3px)', // Adjust the blur value as needed
                },
            }}
        >
            <Box sx={style}>


                {isSmallScreen &&
                    <Toolbar sx={{ justifyContent: 'space-between', paddingBottom: 3 }} disableGutters>
                        <Stack direction={'row'} justifyItems={'center'} gap={2} >

                            <IconButton onClick={onClose} >
                                <Close />
                            </IconButton>

                            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                                <Typography variant="h6">{title}</Typography>
                            </Box>
                        </Stack>

                        {/*    {isSmallScreen ?
                        <Button variant="text" onClick={() => handleSaveButtonClick()} >Save</Button> :
                        <IconButton onClick={handleModalClose} > <Close /> </IconButton>
                    } */}

                    </Toolbar>
                }

                {!isSmallScreen &&
                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{ mb: 4 }}
                        textAlign='center'
                    >
                        {title}
                    </Typography>
                }

                {children}

            </Box>
        </Modal>
    )
}

export default FormModal