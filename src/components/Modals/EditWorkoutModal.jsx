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
    height: { xs: '100vh' },
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

    console.log("Rendering CrateEditMOdal ", workout);

    const isExercises = useSelector(state => state.template.exercises.allIds).length !== 0
    const isName = useSelector(state => state.template.name) !== ""
    const [openWarningModal, setOpenWarningModal] = useState(false)
    const [openSaveModal, setOpenSaveModal] = useState(false)
    const isSmallScreen = useMediaQuery('(max-width:600px)')

    const dispatch = useDispatch()

    const handleSaveButtonClick = () => {
        if (!isExercises) {
            toast.warning("Add atleast one exercise before saving!")
        } else if (!isName) {
            toast.warning("Give your workout a name!")
        } else {
            setOpenSaveModal(true)
        }
    }

    const handleModalClose = () => {
        if (isExercises /* && disableWarning */) {
            setOpenWarningModal(true)
        } else {
            onClose(false)
        }
    }

    const handleSubmit = () => {
        onClose(false)
        setOpenSaveModal(false)
        setOpenWarningModal(false)
        dispatch(clearTemplate())
    }

    const handleCancelFinish = () => {
        //onClose(false)
        setOpenSaveModal(false)
        //setOpenWarningModal(false)

    }

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
                                <IconButton onClick={() => onClose(false)} >
                                    <Close />
                                </IconButton>
                            }
                            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                                <Typography variant="h6">Edit workout</Typography>
                            </Box>
                        </Stack>

                        {isSmallScreen ?
                            <Button variant="text" onClick={() => onClose(false)} >Save</Button> :
                            <IconButton onClick={() => onClose(false)} >
                                <Close />
                            </IconButton>

                        }

                    </Toolbar>

                    <Box sx={{ overflowY: 'auto', height: '90%' }}>
                        <Workout type={"template"} />
                    </Box>

                    {!isSmallScreen &&
                        <Fab
                            onClick={() => onClose(false)}
                            color='info'
                            sx={{ position: 'absolute', bottom: 25, right: 25 }}
                        >
                            <Save></Save>
                        </Fab>
                    }
                </Box>
            </div>
        </Modal>
    )

    return (
        <>
            {isSmallScreen &&
                <FullScreenMobileModal
                    open={open}
                    onClose={handleModalClose}
                >
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Stack direction={'row'} justifyItems={'center'} gap={2} >
                            <IconButton onClick={() => onClose(false)}>
                                <Close />
                            </IconButton>
                            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                                <Typography variant="h6">Create template</Typography>
                            </Box>
                        </Stack>

                        <Button variant="text">Save</Button>

                    </Toolbar>
                    <Box sx={{ overflowY: 'auto', height: '100%' }}>
                        <Workout type={"template"} />
                    </Box>

                </FullScreenMobileModal>
            }
            {!isSmallScreen &&
                <BasicModal
                    open={open}
                    onClose={handleModalClose}
                    onSubmit={handleSaveButtonClick}
                    title={title}
                    confirmButtonText={"Save"}
                >
                    <Box sx={{ overflow: 'auto', height: '80vh', marginY: 2 }} >
                        <Workout type={'template'} />
                    </Box>
                </BasicModal>
            }
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
            {openSaveModal &&
                <SaveWorkoutModal
                    open={openSaveModal}
                    onClose={() => handleCancelFinish()}
                    onSubmit={() => handleSubmit()}
                    type={type}
                    editVipu={editVipu}
                    workout={workout}
                />
            }
        </>


    )
}

export default EditWorkoutModal