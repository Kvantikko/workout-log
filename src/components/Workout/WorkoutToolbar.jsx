import { Typography, Stack, Button } from "@mui/material"
import TimerIcon from '@mui/icons-material/Timer';
import { useDispatch, useSelector } from "react-redux";
import { startWatch } from "../../redux/reducers/stopWatchReducer";
import SaveWorkoutModal from "./SaveWorkoutModal";
import CancelWorkoutModal from "../Modals/CancelWorkoutModal";
import ModalRoot from "../Modals/ModalRoot";

import { useState } from "react";


const WorkoutToolbar = () => {

    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    const stopWatchIsActive = useSelector(state => state.stopWatch.isActive)
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('')

    const handleModalOpen = (type) => {
        setShowModal(true)
        setModalType(type)
    }

    const renderWorkoutToolButtons = () => {
        if (workoutStarted) {
            return (
                <Stack direction={"row"} spacing={1} >
                    {!stopWatchIsActive &&
                        <Button variant="contained" onClick={() => dispatch(startWatch())}>
                            <TimerIcon />
                        </Button>}
                    {/*  <CancelWorkoutModal></DiscardWorkoutModal>
                    <SaveWorkoutModal></SaveWorkoutModal> */}
                    <Button variant="contained" onClick={() => handleModalOpen("cancelWorkout")}>Cancel</Button>
                    <Button variant="contained"  onClick={() => handleModalOpen("saveWorkout")}>Finish</Button>
    
                </Stack>
            )
        }
    }


    return (
        <>
            <Typography variant="h6" component="div">
                Workout
            </Typography>
            {renderWorkoutToolButtons()}
            <ModalRoot open={showModal} modalType={modalType} setOpen={setShowModal}/>
        </>
    )
}

export default WorkoutToolbar