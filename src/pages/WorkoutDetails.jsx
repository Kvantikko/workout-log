import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { startWorkout } from "../redux/reducers/workoutReducer"

import { Button, AppBar, Typography, Container, Box, Fab } from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import BasicToolbar from '../components/Toolbars/BasicToolbar'
import BasicModal from '../components/Modals/BasicModal'
import HideAppBar from "../components/AppBar/HideAppBar"
import WorkoutExerciseList from "../components/Lists/WorkoutExerciseList"

import { formatDate } from "../utils/Date"

const WorkoutDetails = ({
    drawerWidth,
    workout,
    showDate,
    backFunction,
    link,
    startButtonText,
    menu,

}) => {

    console.log("Rendering WorkoutDetails ", workout);

    const isBigScreen = useMediaQuery('(min-width:600px)')
    const isWorkoutActive = useSelector(state => state.workout.workoutStarted)
    const [showCopyModal, setShowCopyModal] = useState(false)

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

    const dispatch = useDispatch()

    const copy = () => {
        setShowCopyModal(false)
        dispatch(startWorkout(isWorkoutActive, workout))
    }

    const handleCopy = () => {
        if (isWorkoutActive) {
            setShowCopyModal(true)
            return
        }
        copy()
    }

    const calculateBottom = () => {
        if (isWorkoutActive) return 112
        if (isBigScreen) return 0
        return 56
    }

    return (
        <Box paddingTop={{ xs: 2, sm: 3, md: 4 }} >
            <HideAppBar drawerWidth={drawerWidth}>
                <BasicToolbar
                    title={workout.title}
                    showBack={true}
                    backFunction={backFunction}
                    link={link}
                >
                    <Button
                        variant="contained"
                        onClick={(event) => handleCopy(event)}
                        sx={{
                            height: 0.1,
                            alignSelf: "center",
                            display: isBigScreen || isWorkoutActive ? 'flex' : 'none'
                        }}
                    >
                        <PlayArrowIcon />
                        {isBigScreen ? startButtonText : null}
                    </Button>
                    {menu}
                </BasicToolbar>
            </HideAppBar>

            {showDate &&
                <Typography
                    align='center'
                    color="text.secondary"
                    variant="body1"
                    noWrap
                    paddingBottom={0}
                // paddingTop={{ xs: 2, sm: 3, md: 4 }}
                >
                    {/*   {formatDateTime(workout.createdAt, true)} */}
                    {formatDate(new Date(workout.createdAt))

                    }
                </Typography>
            }
            <Container width="100%" sx={{ paddingTop: 1 }}>

                <Typography
                    variant="body1"
                    textAlign={'center'}
                    color={'text.secondary'}
                //sx={{ paddingX: 6, width: 'fit-content', borderRadius: 1 }}
                //noWrap
                >
                    {workout.note}
                </Typography>
            </Container>



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
                        bottom: isBigScreen ? 0 : 56,
                        padding: 2,
                        paddingBottom: 2,
                        backgroundColor: "transparent",
                        //width: isSmallScreen ? `calc(100% - ${drawerWidth}px)` :   '100%',
                        display: { xs: isWorkoutActive ? 'none' : 'flex', sm: 'none' },
                    }}
                >

                    <Button
                        // component={Link}
                        //to='/workout'
                        //color="info"
                        variant="contained" onClick={() => handleCopy()} >
                        <PlayArrowIcon />
                        {startButtonText}
                    </Button>
                    <BasicModal
                        open={showCopyModal}
                        onClose={() => setShowCopyModal(false)}
                        title="Workout in progress!"
                        subTitle="You have a workout in progress.
                        Are you sure you want to override the current workout?"
                        onSubmit={() => copy()}
                    />


                </AppBar>
            </Box>

        </Box>
    )
}

export default WorkoutDetails