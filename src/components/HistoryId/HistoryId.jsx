
import HistoryIdToolbar from './HistoryIdToolbar';
import HideAppBar from '../AppBar/HideAppBar';
import axios from 'axios';

import exerciseService from '../../services/exercises'


import { Link } from "react-router-dom";

import { Button, AppBar, Divider, Stack, Typography, List, ListItem, ListItemButton, ListItemText, Container, Box, Grid, Paper } from "@mui/material";
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



const HistoryId = ({ workout }) => {

    /**
     * ekalla componentin mountilla fetchataan data ja pistetään storeen, ja aina kun komponentti
     * mounttaa seuraavaksi niin haetaan storesta
     */

    /* useEffect(() => {
        exerciseService
            .getHistory(user.email, exercise.id)
            .then((response) => {
                console.log("EXERCISE COMPONENT ", response);
                setworkoutExercises(response)
            })
    }, [history]) */


    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    const darkMode = useSelector(state => state.darkMode)
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

    const format = (date) => {
        const dateString = date.toUTCString()
        const dateStringWithoutTime = dateString.slice(0, dateString.length - 13)
        const timeString = dateString.slice(dateString.length - 12, dateString.length - 7)
        return dateStringWithoutTime + ",  @ " + timeString
    }


    return (
        <>
            <HideAppBar>
                <HistoryIdToolbar workout={workout} />
            </HideAppBar>

            <Box
                display="flex"
                justifyContent="center"
                //alignItems="center"
                //minHeight="100vh"
                paddingX={2} paddingBottom={12}
            >
                <Stack spacing={0} maxWidth={700} >

                    {/* DATE */}
                    <Typography align='center' color="text.secondary" variant="body1" noWrap paddingBottom={2} >
                        {/*   {formatDateTime(workout.createdAt, true)} */}
                        {format(new Date(workout.createdAt))

                        }
                    </Typography>

                    <Box
                        padding={0}
                        sx={{
                            minWidth: 1,
                            overflow: "hidden",
                            textOverflow: 'ellipsis',
                        }}
                    >
                        <Stack
                            spacing={2}
                            sx={{
                                minWidth: 1,
                                justifyContent: 'space-between',
                                // backgroundColor: "red"
                            }}>
                            <WorkoutExerciseList workoutExercises={workout.workoutExercises} />
                        </Stack>
                    </Box>

                </Stack>
                <AppBar
                    position="fixed"
                    color=""
                    elevation={0}
                    sx={{ top: 'auto', bottom: 56, padding: 2, paddingBottom: 2 }}
                >

                    <Button
                        // component={Link}
                        //to='/workout'
                        //color="info"
                        variant="contained" onClick={(event) => handleCopy(event)} >
                        Perform again
                    </Button>
                    <ConfirmationModal
                        showModal={showModal}
                        closeFromParent={setShowModal}
                        hideOpenButton='true'
                        // menuItem={true}
                        modalType='confirmCopyModal'
                        //color='info'
                        openButton={
                            'Perform again'
                        }
                        //confirmButton='Delete'
                        confirmFunction={handleCopy}
                    //handleMenuClose={handleClose}
                    />

                </AppBar>
            </Box>

        </>
    )
}

export default HistoryId