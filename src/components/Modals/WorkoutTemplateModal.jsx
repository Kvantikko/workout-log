import { useState, useRef, useCallback, useEffect } from 'react'

import { unstable_useBlocker as useBlocker, useActionData, Outlet } from 'react-router-dom'

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
import PageModal from './PageModal'
import { useNavigate } from 'react-router-dom'

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



function ConfirmNavigation({ blocker }) {
    if (blocker.state === "blocked") {
        return (
            <>
                <p style={{ color: "red" }}>
                    Blocked the last navigation to {blocker.location.pathname}
                </p>
                <button onClick={() => blocker.proceed?.()}>Let me through</button>
                <button onClick={() => blocker.reset?.()}>Keep me here</button>
            </>
        );
    }

    if (blocker.state === "proceeding") {
        return (
            <p style={{ color: "orange" }}>Proceeding through blocked navigation</p>
        );
    }

    return <p style={{ color: "green" }}>Blocker is currently unblocked</p>;
}




const WorkoutTemplateModal = ({ onClose, workout, title, type, disableWarning, editVipu }) => {

    const isExercises = useSelector(state => state.template.exercises.allIds).length !== 0
    const isName = useSelector(state => state.template.name) !== ""
    const [openWarningModal, setOpenWarningModal] = useState(false)
    // const [openSaveModal, setOpenSaveModal] = useState(false)
    const isSmallScreen = useMediaQuery('(max-width:600px)')
    const prevUrl = window.location.href

    const navigate = useNavigate()
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
            // window.history.back()
        } else {
            window.history.back()
            dispatch(clearTemplate())
        }
    }

    const handleSubmit = () => {
        //onClose(false)
        //setOpenSaveModal(false)
        setOpenWarningModal(false)
        navigate("/")
        dispatch(clearTemplate())

    }

    const handleCancelFinish = () => {
        setOpenSaveModal(false)
    }


    let actionData = useActionData()

    // Allow the submission navigation to the same route to go through
    let shouldBlock = useCallback(
        ({ currentLocation, nextLocation }) => {
            console.log("BLOCK");
            if (isExercises && currentLocation.pathname !== nextLocation.pathname && currentLocation.pathname === "workout-template"  ) {
                setOpenWarningModal(true)
                return true
            } 
            return false


        },
        [isExercises]
    );

    let blocker = useBlocker(shouldBlock)

    // Clean the input after a successful submission
    useEffect(() => {
        if (actionData?.ok) {
            //setValue("");
        }
    }, [actionData]);

    // Reset the blocker if the user cleans the form
    useEffect(() => {
        if (blocker.state === "blocked" && !isExercises) {
            blocker.reset();
        }
        //return () => blocker.reset()
    }, [blocker, isExercises]);






    return (
        <PageModal
            fullHeight={true}
            fullWidth={true}
            hideFooter={true}
            header={<Typography variant="h6">Workout template</Typography>}
            onClose={handleModalClose}
        >
            <Workout type={"template"} />
            {blocker ? <ConfirmNavigation blocker={blocker} /> : null}
            {!isSmallScreen &&
                <Fab
                    onClick={() => handleSaveButtonClick()}
                    color='info'
                    sx={{ position: 'absolute', top: "90svh", right: 30 }}
                >
                    <Save />
                </Fab>
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
            <Outlet></Outlet>
        </PageModal>
    )

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

export default WorkoutTemplateModal