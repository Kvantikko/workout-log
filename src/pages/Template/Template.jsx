
import HistoryIdToolbar from '../../components/Toolbars/HistoryIdToolbar';
import HideAppBar from '../../components/AppBar/HideAppBar';
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

import WorkoutExerciseSets from "../../components/Lists/WorkoutExerciseSets";
import WorkoutExerciseList from "../../components/Lists/WorkoutExerciseList";

import HistoryModalMenu from "../../components/Menus/HistoryMenu";


import ModalRoot from "../../components/Modals/ModalRoot";

import { useEffect, useState } from "react";
import ConfirmationModal from "../../components/Modals/ConfirmationModal";

import useMediaQuery from '@mui/material/useMediaQuery';
import TemplateToolbar from '../../components/Toolbars/TemplateToolbar';






const Template = ({ template, drawerWidth }) => {
    console.log("Rendering Template");
    console.log( template);

    const isSmallScreen = useMediaQuery('(min-width:900px)');



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

    //history.push(`/history/${workout?.id}`);


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

        //navigate('/workout')
        clear()
        dispatch(copyWorkout({ title: template.title, exercises: template.workoutExercises }))
        dispatch(copyExercises(template.workoutExercises))
        // this is done bc in the workout object coming from the server, sets dont have a reference field of exerciseId
        let setsWithExerciseId = []
        template.workoutExercises.forEach(exercise => {
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
            <HideAppBar drawerWidth={drawerWidth}>
                <TemplateToolbar
                    workout={template}
                    setShowModal={setShowModal}
                    showModal={showModal}
                    handleCopy={handleCopy}
                />
            </HideAppBar>

            <Box
                paddingX={{ xs: 2, sm: 4, md: 6 }} paddingBottom={12} paddingTop={2}
            >
                <Box
                    padding={0}
                    sx={{
                        minWidth: 1,
                        overflow: "hidden",
                        textOverflow: 'ellipsis',
                    }}
                >
                    <WorkoutExerciseList workoutExercises={template.workoutExercises} />
                </Box>

                <AppBar
                    position="fixed"
                    color=""
                    elevation={0}
                    sx={{
                        top: 'auto',
                        // bottom: theme => theme.isSmallScreen ? 0 : 56,
                        bottom: isSmallScreen ? 0 : 56,
                        padding: 2,
                        paddingBottom: 2,
                        //width: isSmallScreen ? `calc(100% - ${drawerWidth}px)` :   '100%',
                        display: { xs: 'flex', md: 'none' },
                    }}
                >

                    <Button
                        // component={Link}
                        //to='/workout'
                        //color="info"
                        variant="contained" onClick={(event) => handleCopy(event)} >
                        Start workout
                    </Button>
                    <ConfirmationModal
                        showModal={showModal}
                        closeFromParent={setShowModal}
                        hideOpenButton='true'
                        // menuItem={true}
                        modalType='confirmCopyModal'
                        //color='info'
                        openButton={
                            'Start workout'
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

export default Template