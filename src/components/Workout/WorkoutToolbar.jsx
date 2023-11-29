import { Typography, Stack, Button, IconButton } from "@mui/material"
import TimerIcon from '@mui/icons-material/Timer';
import { useDispatch, useSelector } from "react-redux";
import { startWatch } from "../../redux/reducers/stopWatchReducer";
import ModalRoot from "../Modals/ModalRoot";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

import { toast } from "react-toastify";

import { useState } from "react";
import ConfirmationModal from "../Modals/ConfirmationModal";

import { clearWorkout } from "../../redux/reducers/workoutReducer";
import { clearExercises } from "../../redux/reducers/exerciseReducer";
import { clearSets } from "../../redux/reducers/setReducer";
import { stopWatch } from "../../redux/reducers/stopWatchReducer";
import { resetWorkout } from "../../redux/reducers/navReducer"

import FormModal from "../Modals/FormModal";
import { Link, useNavigate } from "react-router-dom";



import useMediaQuery from '@mui/material/useMediaQuery';


import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import StopWatch from "../Clock/StopWatch";




const WorkoutToolbar = ({ }) => {
    console.log("WorkoutToolbar is rendering");
    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    const exercises = useSelector(state => state.exercises)
    const stopWatchIsActive = useSelector(state => state.stopWatch.isActive)
    const [showModal, setShowModal] = useState(false)
    const isSmallScreen = useMediaQuery('(min-width:900px)');


    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleModalOpen = () => {
        setShowModal(true)
    }

    const handleFinishClick = () => {
        if (exercises.length === 0) {
            toast.warning('Add at least one exercise before finishing!')
            return
        }
        handleModalOpen()
    }

    const handleClear = () => {
        dispatch(clearWorkout())
        dispatch(clearExercises())
        dispatch(clearSets())
        dispatch(stopWatch())
        dispatch(resetWorkout())
        navigate('/')
    }

    return (
        <>
            <>
                <Stack direction={"row"} spacing={0} overflow={'hidden'}>
                    <Button
                        variant='secondary'
                        component={Link}
                        to={'/'}
                        onClick={() => dispatch(resetWorkout())}
                        sx={{
                            minWidth: 'auto',
                            paddingRight: 0,
                            paddingLeft: 0,
                            marginRight: 0,

                            textTransform: 'none'
                        }}
                    >
                        <ArrowBackIcon sx={{ marginRight: isSmallScreen ? 1 : 0 }} />
                        {isSmallScreen ?
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ padding: 0, margin: '0 !important' }}

                                //alignSelf={'center'}
                                //overflow={'hidden'}
                                noWrap
                            >
                                {`Home /`}
                            </Typography>
                            :
                            null
                        }
                    </Button>
                    <Typography
                        variant="h6"

                        component="div"
                        sx={{ marginLeft: 1 }}
                        alignSelf={'center'}
                        overflow={'hidden'}
                        noWrap
                        margin={0}
                    >
                        Workout
                    </Typography>
                </Stack>


                {/*  <StopWatch timerSize={'h5'}/> */}
                <Stack
                    direction={"row"}
                    spacing={{ xs: 1, sm: 2 }}
                    paddingY={1.5}
                    alignSelf={'flex-start'}
                >

                    <FormModal
                        hideOpenButton='true'
                        showModal={showModal}
                        closeFromParent={setShowModal}
                        modalType='saveWorkout'
                        color='success'
                        openButton={
                            <CheckCircleOutlineIcon />
                        }
                    //confirmButton=''
                    //confirmFunction={handleClear}
                    />
                    {!stopWatchIsActive &&

                        <IconButton
                            aria-label="stopwatch"
                            sx={{ color: '#90CAF9', padding: 0.5 }}
                            onClick={() => dispatch(startWatch())}
                        >
                            <TimerIcon />
                        </IconButton>

                        /*    <Button variant="contained" onClick={() => dispatch(startWatch())}>
                               <TimerIcon />
                           </Button> */
                    }
                    <ConfirmationModal
                        modalType='cancelWorkout'
                        color='error'
                        openButton={
            
                                <NotInterestedIcon />
                       

                        }
                        confirmButton='Yes'
                        confirmFunction={handleClear}
                    />

                    {/* <IconButton aria-label="finish" color="success" onClick={handleFinishClick}>
                        <CheckCircleOutlineIcon />
                    </IconButton> */}

                     <Button
                        color="success"
                        variant="contained"

                        onClick={handleFinishClick}
                    >
                        <CheckCircleOutlineIcon />
                    </Button>

                </Stack>
            </>


        </>
    )
}

export default WorkoutToolbar