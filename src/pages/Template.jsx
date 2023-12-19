import { useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { startWorkout } from "../redux/reducers/workoutReducer"
import { resetWorkoutPath } from '../redux/reducers/navReducer'

import { Button, AppBar, Box } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery'

import BasicModal from '../components/Modals/BasicModal'
import BasicToolbar from '../components/Toolbars/BasicToolbar'
import HideAppBar from '../components/AppBar/HideAppBar'
import TemplateMenu from '../components/Menus/TemplateMenu'
import WorkoutExerciseList from "../components/Lists/WorkoutExerciseList"

const Template = ({ template, drawerWidth }) => {
    
    console.log("Rendering Template");

    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    const isSmallScreen = useMediaQuery('(min-width:900px)')
    const [openCopyModal, setOpenCopyModal] = useState(false)

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

    const dispatch = useDispatch()

    const copy = () => {
        setOpenCopyModal(false)
        dispatch(startWorkout(workoutStarted, template))
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
                <BasicToolbar
                    title={template.title}
                    showBack={true}
                    backFunction={() => dispatch(resetWorkoutPath())}
                    link={"/"}
                >
                    {isSmallScreen ?
                        <Button
                            sx={{ height: 0.1, alignSelf: "center" }}
                            variant="contained"
                            onClick={(event) => handleCopy(event)}
                        >
                            Start workout
                        </Button>
                        :
                        null
                    }
                    <TemplateMenu workout={template} />
                </BasicToolbar>
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
                    <Button variant="contained" onClick={handleCopy} >
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