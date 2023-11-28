import { Link } from "react-router-dom"
import ActiveWorkout from "../Workout/ActiveWorkout"
import { useEffect, useState } from "react"
import { Button, Stack, Divider, Container, Box, Modal, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

import { startWorkout } from "../../redux/reducers/workoutReducer"

import ModalRoot from "../Modals/ModalRoot"
import WorkoutToolbar from "./WorkoutToolbar"
import HideAppBar from "../AppBar/HideAppBar"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import PermanentDrawerLeft from "../Navbar/PermanentDrawerLeft"

import { pushWorkout } from "../../redux/reducers/navReducer"
import ConfirmationModal from "../Modals/ConfirmationModal"
import { useNavigate } from "react-router-dom"

import { clearWorkout } from "../../redux/reducers/workoutReducer";
import { clearExercises } from "../../redux/reducers/exerciseReducer";
import { clearSets } from "../../redux/reducers/setReducer";
import { stopWatch } from "../../redux/reducers/stopWatchReducer";
import { resetWorkout } from "../../redux/reducers/navReducer"

import { keyframes } from '@mui/system';

import { blink } from "../../utils/Blink"



const Workout = ({ user, drawerWidth }) => {

    console.log("Workout is rendering");
    console.log(theme => theme);
    //setPageIndex(1)
    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    const [showModal, setShowModal] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()





    const handleScrollPosition = () => {
        const scrollPosition = sessionStorage.getItem("scrollPosition");
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition));
            //   console.log('handling scroll position ', scrollPosition);
            sessionStorage.removeItem("scrollPosition");
        }
    }

    // efekti ei vie täysin ikkunan pohjaan, koska luodaan yksi automaattinen seti sen jälkeen
    useEffect(() => {
        console.log("EFFECT SCROLL POSITION");
        handleScrollPosition()
    }, [])


    const handleClear = () => {
        dispatch(clearWorkout())
        dispatch(clearExercises())
        dispatch(clearSets())
        dispatch(stopWatch())
        dispatch(resetWorkout())
        navigate('/')
    }



    const handleClick = () => {
        if (workoutStarted && (!showModal)) {
            //event.stopPropagation()
            setShowModal(true)
            return
        }
        navigate('/workout')

        dispatch(clearWorkout())
        dispatch(clearExercises())
        dispatch(clearSets())
        dispatch(stopWatch())
        dispatch(resetWorkout())

        dispatch(pushWorkout())
        dispatch(startWorkout())
    }

    const handleClick2 = () => {
        dispatch(pushWorkout())
    }

    return (
        <>
            <HideAppBar drawerWidth={drawerWidth} >
                <WorkoutToolbar />
            </HideAppBar>



            <Stack padding={3} spacing={2} alignItems="center">
                {!workoutStarted &&
                    < Stack spacing={2} padding={3}>
                        <Typography variant="h5" textAlign={'center'}> Hello {user.firstname}! &#128075;</Typography>
                        <Typography variant="h5" textAlign={'center'}>Time to workout?</Typography>
                    </Stack>
                }

                {workoutStarted &&
                    <>
                        <Button
                            variant="contained"
                            component={Link} to={`/workout`}
                            onClick={handleClick2}
                            color={'error'}

                            sx={{
                                maxWidth: 0.8,
                                padding: 2,
                                textAlign: 'center',
                                animation: `${blink} 1s linear infinite alternate`,
                            }}
                        >
                            <>You have a workout in progress!</> <ArrowForwardIcon sx={{ marginLeft: 1}}/>
                        </Button>
                        <Divider orientation="horizontal" flexItem>
                            start again?
                        </Divider>
                    </>
                }

                <Button
                    variant="contained"
                    //component={Link} to={`/workout`}
                    onClick={handleClick}
                    //onClick={() => dispatch(startWorkout())}
                    sx={{ maxWidth: 0.8 }} >
                    Start a new workout
                </Button>



                <Divider orientation="horizontal" flexItem>
                    or
                </Divider>
                <Button
                    variant="contained"
                    sx={{ maxWidth: 0.8 }}
                    component={Link} to='/history'
                //onClick={() => setPageIndex(1)}
                >
                    Select from history
                </Button>
                <Divider orientation="horizontal" flexItem>
                    or
                </Divider>
                <Typography variant="h6" textAlign="center">
                    Select a saved template (Feature not implemented yet.)
                </Typography>
            </Stack >
            <ConfirmationModal
                showModal={showModal}
                closeFromParent={setShowModal}
                hideOpenButton='true'
                // menuItem={true}
                modalType='confirmCopyModal'
                //color='info'
                openButton={
                    'Start new'
                }
                //confirmButton='Delete'
                confirmFunction={handleClick}
            //handleMenuClose={handleClose}
            />


            {/*   {workoutStarted && <ActiveWorkout style={{ padding: 10 }} />} */}

        </>
    )
}

export default Workout