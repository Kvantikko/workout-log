import { Typography, Stack, Button } from "@mui/material"
import TimerIcon from '@mui/icons-material/Timer';
import { useDispatch, useSelector } from "react-redux";
import { startWatch } from "../../redux/reducers/stopWatchReducer";
import ModalRoot from "../Modals/ModalRoot";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

import { toast } from "react-toastify";

import { useState } from "react";


const WorkoutToolbar = () => {
    console.log("WorkoutToolbar is rendering");
    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    const exercises = useSelector(state => state.exercises)
    const stopWatchIsActive = useSelector(state => state.stopWatch.isActive)
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('')

    const dispatch = useDispatch()

    const handleModalOpen = (type) => {
        setShowModal(true)
        setModalType(type)
    }

    return (
        <>
            <Typography variant="h6" component="div">
                Workout
            </Typography>
            <ModalRoot open={showModal} modalType={modalType} setOpen={setShowModal} />
            {workoutStarted &&
                <Stack direction={"row"} spacing={1} >
                    {!stopWatchIsActive &&
                        <Button  variant="contained" onClick={() => dispatch(startWatch())}>
                            <TimerIcon />
                        </Button>}
                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => handleModalOpen("cancelWorkout")}
                    >
                        <NotInterestedIcon />
                        {/*  Cancel */}
                    </Button>
                    <Button
                        color="success"
                        variant="contained"
                        onClick={() => {
                            if (exercises.length === 0) {
                                toast.warning('Add at least one exercise before finishing!')
                                return
                            }
                            handleModalOpen("saveWorkout")
                        }}
                    >
                        <CheckCircleOutlineIcon />
                        {/*  Finish */}
                    </Button>
                </Stack>
            }
        </>
    )
}

export default WorkoutToolbar