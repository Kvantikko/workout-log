import { useState, useRef, useEffect } from 'react'
import FullScreenMobileModal from "./FullScreenMobileModal"

import { ArrowBack, Close, Done, Save } from '@mui/icons-material'
import { Box, Modal, Fab, IconButton, Stack, useMediaQuery, AppBar, Button, Toolbar, Typography } from '@mui/material'

import { useDispatch, useSelector } from "react-redux"
import { clearTemplate } from "../../redux/reducers/templateReducer"
import SaveWorkoutModal from "./SaveWorkoutModal"
import BasicModal from "./BasicModal"
import CloseModalButton from '../Buttons/CloseModalButton'
import Workout from "../Workout/Workout"
import WorkoutToolbar from "../Toolbars/WorkoutToolbar"

import { toast } from "react-toastify"

export const editWorkoutStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100vw', sm: '70vw', md: '50vw' },
    height: { xs: '100svh' },
    //maxHeight: '100%',
    // maxWidth: 550,
    bgcolor: '#222326',
    borderRadius: 4,
    //border: '2px solid #000',
    boxShadow: 24,
    //p: { xs: 2, sm: 4},

    //overflow: 'scroll'
    //display: 'flex',
    //flexDirection: 'column'
}


const EditWorkoutModal = ({ open, onClose, workout, title, type, disableWarning, editVipu }) => {

    const isExercises = useSelector(state => state.template.exercises.allIds).length !== 0
    const isName = useSelector(state => state.template.name) !== ""
    const [openWarningModal, setOpenWarningModal] = useState(false)
    // const [openSaveModal, setOpenSaveModal] = useState(false)
    const isSmallScreen = useMediaQuery('(max-width:600px)')
    const prevUrl = window.location.href

    const dispatch = useDispatch()

    /* const handleSaveButtonClick = () => {
        if (!isExercises) {
            toast.warning("Add atleast one exercise before saving!")
        } else if (!isName) {
            toast.warning("Give your workout a name!")
        } else {
            setOpenSaveModal(true)
        }
    } */

    const handleModalClose = () => {
        if (isExercises /* && disableWarning */) {
            setOpenWarningModal(true)
        } else {
            onClose(false)
        }
    }

    const handleSubmit = () => {
        onClose(false)
        //setOpenSaveModal(false)
        setOpenWarningModal(false)
        dispatch(clearTemplate())
    }

    const handleCancelFinish = () => {
        setOpenSaveModal(false)
    }

    useEffect(() => {
        if (!window.location.href.includes("#edit")) {
            window.history.pushState(null, null, `${prevUrl}/#edit`)
        }

        window.onpopstate = (event) => handleModalClose()

        return (() => {
            window.history.replaceState(null, null, `${prevUrl}`)
            window.onpopstate = null
        })
    }, [])

    return (
        <Modal
            open={open}
            onClose={handleModalClose}
            BackdropProps={{
                timeout: 500,
                sx: {
                    backdropFilter: 'blur(3px)'
                },
            }}
        >
            <div>
                {/*  <CloseModalButton onClick={handleModalClose} /> */}

                <Box sx={editWorkoutStyle}>

                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Stack direction={'row'} justifyItems={'center'} gap={2} >
                            {isSmallScreen &&
                                <IconButton onClick={handleModalClose} >
                                    <Close />
                                </IconButton>
                            }
                            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                                <Typography variant="h6">{title}</Typography>
                            </Box>
                        </Stack>

                        <SaveWorkoutModal
                            openButton={isSmallScreen ?
                                <Button variant="text" onClick={() => handleSaveButtonClick()} >Save</Button>
                                :
                                <Fab
                                    //onClick={() => handleSaveButtonClick()}
                                    color='info'
                                    sx={{ position: 'absolute', top: "90svh", right: 30 }}
                                >
                                    <Save />
                                </Fab>
                            }
                            type={type}
                            editVipu={editVipu}
                            onSubmit={() => handleSubmit()}
                        />

                        {/*  <SaveWorkoutModal
                            openBu={openSaveModal}
                            type={type}
                            editVipu={editVipu}
                            workout={workout}
                            onClose={() => handleCancelFinish()}
                            onSubmit={() => handleSubmit()}
                        /> */}


                        {!isSmallScreen &&
                           /*  <Button variant="text" onClick={() => handleSaveButtonClick()} >Save</Button> : */
                            <IconButton onClick={handleModalClose} > <Close /> </IconButton>
                        }

                    </Toolbar>

                    <Box sx={{ overflowY: 'auto', height: '90%' }}>
                        <Workout type={"template"} />
                    </Box>

                    {/*  {!isSmallScreen &&
                        <Fab
                            onClick={() => handleSaveButtonClick()}
                            color='info'
                            sx={{ position: 'absolute', bottom: 25, right: 25 }}
                        >
                            <Save/>
                        </Fab>
                    } */}
                    {openWarningModal &&
                        <BasicModal
                            open={openWarningModal}
                            onClose={() => setOpenWarningModal(false)}
                            title={"Discard changes?"}
                            subTitle={"Do you want to discard any changes you have made without saving them?"}
                            confirmButtonText={"Yes"}
                            onSubmit={() => handleSubmit()}
                        />
                    }
                    {/*  {openSaveModal &&
                        <SaveWorkoutModal
                            open={openSaveModal}
                            onClose={() => handleCancelFinish()}
                            onSubmit={() => handleSubmit()}
                            type={type}
                            editVipu={editVipu}
                            workout={workout}
                        />
                    } */}
                </Box>
            </div>
        </Modal>
    )
}

export default EditWorkoutModal