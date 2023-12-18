
import BasicModal from '../../components/Modals/BasicModal';


import { Button, AppBar, Divider, Stack, Typography, List, ListItem, ListItemButton, ListItemText, Container, Box, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setWorkout, startWorkout } from "../../redux/reducers/workoutReducer";


import { clearWorkout } from "../../redux/reducers/workoutReducer"
import { stopWatch } from '../../redux/reducers/stopWatchReducer'


import { useNavigate } from "react-router-dom";

import WorkoutExerciseList from "../../components/Lists/WorkoutExerciseList";



import { useEffect, useState } from "react";

import useMediaQuery from '@mui/material/useMediaQuery';
import { resetHistory } from '../../redux/reducers/navReducer';
import HistoryMenu from '../../components/Menus/HistoryMenu';






const HistoryId = ({ workout, drawerWidth }) => {

    const history = useNavigate()

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
        /*     dispatch(clearExercises())
            dispatch(clearSets()) */
        dispatch(stopWatch())
    }

    const copy = () => {
        clear()
        dispatch(setWorkout(workout))
        dispatch(startWorkout())
        // this is done bc in the workout object coming from the server, sets dont have a reference field of exerciseId
        /* let setsWithExerciseId = []
        workout.workoutExercises.forEach(exercise => {
            exercise.sets.forEach(set => {
                const setWithExerciseId = { ...set, exerciseId: exercise.id }
                setsWithExerciseId.push(setWithExerciseId)
            })
        })
        dispatch(copySets(setsWithExerciseId)) */
        setShowModal(false)
    }

    const handleCopy = (event) => {
        if (workoutStarted) {
            //event.stopPropagation()
            setShowModal(true)
            return
        }
        copy()
    }

    const format = (date) => {
        const dateString = date.toUTCString()
        const dateStringWithoutTime = dateString.slice(0, dateString.length - 13)
        const timeString = dateString.slice(dateString.length - 12, dateString.length - 7)
        return dateStringWithoutTime + ",  @ " + timeString
    }


    return (
        <>
            <BasicToolbar
                title={workout.title}
                showBack={true}
                backFunction={() => dispatch(resetHistory())}
                link={"/history"}
            >
                {isSmallScreen ?
                    <Button
                        sx={{
                            height: 1, margin: 'auto', whiteSpace: 'nowrap',
                            textAlign: 'center', paddingY: 0.6, paddingX: 2, alignSelf: "center"
                        }}
                        variant="contained" onClick={(event) => handleCopy(event)} >
                        Perform again
                    </Button>
                    :
                    null
                }
                <HistoryMenu workout={workout} />
            </BasicToolbar>

            {/* DATE */}
            <Typography
                align='center'
                color="text.secondary"
                variant="body1"
                noWrap
                paddingBottom={0}
                paddingTop={{ xs: 2, sm: 3, md: 4 }}
            >
                {/*   {formatDateTime(workout.createdAt, true)} */}
                {format(new Date(workout.createdAt))

                }
            </Typography>

            <Box
                //display="flex"
                // justifyContent="center"
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
                    <WorkoutExerciseList workoutExercises={workout.workoutExercises} />
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
                        variant="contained" onClick={() => handleCopy()} >
                        Perform again
                    </Button>
                    <BasicModal
                        open={showModal}
                        onClose={() => setShowModal(false)}
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

export default HistoryId