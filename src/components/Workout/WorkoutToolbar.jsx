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
import FormModal from "../Modals/FormModal";


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



    const handleClear = () => {
        dispatch(clearWorkout())
        dispatch(clearExercises())
        dispatch(clearSets())
        dispatch(stopWatch())
        // handleClose()
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
                    {/* <Button
                        color="error"
                        variant="contained"
                        onClick={() => handleModalOpen("cancelWorkout")}
                    >
                        <NotInterestedIcon />
                    </Button> */}
                    <div onClick={() => {
                        if (exercises.length === 0) {
                            toast.warning('Add at least one exercise before finishing!')
                            return
                        }
                    }}>
                        <FormModal
                            modalType='saveWorkout'
                            color='success'
                            openButton={
                                <CheckCircleOutlineIcon />
                            }
                        //confirmButton=''
                        //confirmFunction={handleClear}
                        />
                    </div>

                    {/* <Button
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
                    </Button> */}
                </Stack>
            }
        </>
    )
}

export default WorkoutToolbar