
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


import { useEffect, useState } from "react";

import useMediaQuery from '@mui/material/useMediaQuery';
import TemplateToolbar from '../../components/Toolbars/TemplateToolbar';


import BasicModal from '../../components/Modals/BasicModal';



const Template = ({ template, drawerWidth }) => {
    console.log("Rendering Template");
    //console.log(template);

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
    const isSmallScreen = useMediaQuery('(min-width:900px)')
    const [openCopyModal, setOpenCopyModal] = useState(false)
    
    const dispatch = useDispatch()

    const clear = () => {
        dispatch(clearWorkout())
        dispatch(clearExercises())
        dispatch(clearSets())
        dispatch(stopWatch())
    }

    const copy = () => {
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
        setOpenCopyModal(false)
    }

    const handleCopy = () => {
        if (workoutStarted) {
            setOpenCopyModal(true)
            return
        }
        copy()
    }

    return (
        <>
            <HideAppBar drawerWidth={drawerWidth}>
                <TemplateToolbar
                    workout={template}
                    setShowModal={setOpenCopyModal}
                    showModal={openCopyModal}
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
                    <Button variant="contained" onClick={(event) => handleCopy(event)} >
                        Start workout
                    </Button>
                    <BasicModal
                        open={openCopyModal}
                        onClose={() => setOpenCopyModal(false)}
                        title="Workout in progress!"
                        subTitle="You have a workout in progress.
                        Are you sure you want to override the current workout?"
                        onSubmit={() => copy()}
                    />
                </AppBar>
            </Box>

        </>
    )
}

export default Template