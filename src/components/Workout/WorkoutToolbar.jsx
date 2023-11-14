import { Typography, Stack, Button } from "@mui/material"
import TimerIcon from '@mui/icons-material/Timer';
import { useDispatch, useSelector } from "react-redux";
import { startWatch } from "../../redux/reducers/stopWatchReducer";
import ModalRoot from "../Modals/ModalRoot";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

import { useState } from "react";


const WorkoutToolbar = () => {
    console.log("WorkoutToolbar is rendering");
    const workoutStarted = useSelector(state => state.workout.workoutStarted)
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
                        <Button variant="contained" onClick={() => dispatch(startWatch())}>
                            <TimerIcon />
                        </Button>}
                    <Button
                        variant="contained"
                        onClick={() => handleModalOpen("cancelWorkout")}>
                        <NotInterestedIcon/>
                       {/*  Cancel */}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => handleModalOpen("saveWorkout")}>
                        <CheckCircleOutlineIcon/>
                       {/*  Finish */}
                    </Button>
                </Stack>
            }
        </>
    )
}

export default WorkoutToolbar