import { Typography, Stack, Button } from "@mui/material"
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



import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import StopWatch from "../Clock/StopWatch";




const WorkoutToolbar = ({ handleClear }) => {
    console.log("WorkoutToolbar is rendering");
    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    const exercises = useSelector(state => state.exercises)
    const stopWatchIsActive = useSelector(state => state.stopWatch.isActive)
    const [showModal, setShowModal] = useState(false)

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

    /* const handleClear = () => {
        dispatch(clearWorkout())
        dispatch(clearExercises())
        dispatch(clearSets())
        dispatch(stopWatch())
        dispatch(resetWorkout())
        navigate('/')
    } */

    return (
        <>
            <>
                <Button
                    variant='secondary'
                    component={Link}
                    to={'/'}
                    onClick={() => dispatch(resetWorkout())}
                    sx={{
                        minWidth: 'auto',
                        paddingRight: 0,
                        paddingLeft: 0

                    }}
                >
                    <ArrowBackIcon />
                </Button>
               {/*  <StopWatch timerSize={'h5'}/> */}
                <Stack direction={"row"} spacing={{ xs: 1, sm: 2 }} >

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
                        <Button variant="contained" onClick={() => dispatch(startWatch())}>
                            <TimerIcon />
                        </Button>
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
                    <Button
                        color="success"
                        variant="contained"
                        sx={{ width: 0, maxWidth: 0 }}
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