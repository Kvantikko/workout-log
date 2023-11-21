import { Link } from "react-router-dom";

import { Button, Divider, Stack, Typography, List, ListItem, ListItemButton, ListItemText, Container, Box, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { copyWorkout } from "../../redux/reducers/workoutReducer";
import { copySets } from "../../redux/reducers/setReducer";
import { copyExercises } from "../../redux/reducers/exerciseReducer";

import generateId from "../../utils/generateId";
import { formatDateTime } from "../../utils/Date";

import { clearWorkout } from "../../redux/reducers/workoutReducer"
import { stopWatch } from '../../redux/reducers/stopWatchReducer'
import { clearSets } from '../../redux/reducers/setReducer'
import { clearExercises } from '../../redux/reducers/exerciseReducer'

import { useNavigate } from "react-router-dom";

import WorkoutExerciseSets from "./WorkoutExerciseSets";
import WorkoutExerciseList from "./WorkoutExerciseList";

import HistoryModalMenu from "./HistoryModalMenu";


import ModalRoot from "../Modals/ModalRoot";

import { useEffect, useState } from "react";
import ConfirmationModal from "../Modals/ConfirmationModal";



const HistoryListItem = ({ workout }) => {
    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    const [showModal, setShowModal] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const clear = () => {
        dispatch(clearWorkout())
        dispatch(clearExercises())
        dispatch(clearSets())
        dispatch(stopWatch())
    }

    const handleCopy = (event) => {
        if (workoutStarted && (!showModal)) {
            event.stopPropagation()
            setShowModal(true)
            return
        }

        navigate('/workout')
        clear()
        dispatch(copyWorkout({ title: workout.title, exercises: workout.workoutExercises }))
        dispatch(copyExercises(workout.workoutExercises))
        // this is done bc in the workout object coming from the server, sets dont have a reference field of exerciseId
        let setsWithExerciseId = []
        workout.workoutExercises.forEach(exercise => {
            exercise.sets.forEach(set => {
                const setWithExerciseId = { ...set, exerciseId: exercise.id }
                setsWithExerciseId.push(setWithExerciseId)
            })
        })
        dispatch(copySets(setsWithExerciseId))
    }

    return (
        <Stack padding={1.5} spacing={0}>

           {/*  <ModalRoot open={showModal} setOpen={setShowModal} modalType={"confirmCopyModal"} copyFunction={handleCopy} /> */}

            {/* DATE */}
            <Typography align='center' variant="h5" noWrap >
                {formatDateTime(workout.createdAt, true)}
            </Typography>
            <Divider />

            {/* THE WHOLE BUTTON     <ListItemButton/>   */}
            <Box padding={1} sx={{ minWidth: 1, overflow: "hidden", textOverflow: 'ellipsis', backgroundColor: "#d8e0ed" }} >
                <Stack spacing={2} sx={{ minWidth: 1, justifyContent: 'space-between', /* backgroundColor: "red" */ }}>

                    {/* WORKOUT TITLE */}
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography variant="h5" noWrap >
                            {workout.title}
                        </Typography>
                        <HistoryModalMenu workout={workout}/>
                    </Stack>

                    {/* WORKOUT_EXERCISE LIST */}
                    <WorkoutExerciseList workoutExercises={workout.workoutExercises} />

                    {/* PERFORM AGAIN BUTTON */}
                    <ConfirmationModal
                        showModal={showModal}
                        closeFromParent={setShowModal}
                        hideOpenButton='true'
                       // menuItem={true}
                        modalType='confirmCopyModal'
                        color='info'
                        openButton={
                            'Perform again'
                        }
                        //confirmButton='Delete'
                        confirmFunction={handleCopy}
                        //handleMenuClose={handleClose}
                    />
                    <Button
                        // component={Link}
                        //to='/workout'
                        color="info"
                        variant="contained" onClick={(event) => handleCopy(event)} >
                        Perform again
                    </Button>

                </Stack>
            </Box>

        </Stack>
    )
}

export default HistoryListItem