import { Link } from "react-router-dom"
import ActiveWorkout from "../Workout/Workout"
import { useEffect, useState } from "react"
import { Button, Stack, Divider, Container, Box, Modal, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

import { startWorkout } from "../../redux/reducers/workoutReducer"

import ModalRoot from "../Modals/ModalRoot"
import WorkoutToolbar from "./HomeToolbar"
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

import { expand, unExpand } from "../../redux/reducers/drawerReducer"

import { createPortal } from "react-dom"
import SwipeableEdgeDrawer from "../Drawers/SwipeableEdgeDrawer"
import PermanentDrawerRight from "../Drawers/PermanentDrawerRight"

import coleman from '../../assets/coleman.gif'

import schwarzenegger from '../../assets/schwarzenegger.gif'
import CopyWorkoutModal from "../Modals/CopyWorkoutModal"

const gifArray = [coleman, schwarzenegger]

const getRandomMemeGif = () => {
    const max = gifArray.length
    const min = 0
    const random = Math.floor(Math.random() * (max - min) + min)
    return gifArray[random]
}

const Home = ({ user, drawerWidth }) => {

    console.log("Rendering Home");

    const isWorkoutActive = useSelector(state => state.workout.workoutStarted)
    const [showCopyWorkoutModal, setShowCopyWorkoutModal] = useState(false)

    const dispatch = useDispatch()

    /*   const handleScrollPosition = () => {
          const scrollPosition = sessionStorage.getItem("scrollPosition");
          if (scrollPosition) {
              window.scrollTo(0, parseInt(scrollPosition));
              //   console.log('handling scroll position ', scrollPosition);
              sessionStorage.removeItem("scrollPosition");
          }
      }
  
      // efekti ei vie täysin ikkunan pohjaan, koska luodaan yksi automaattinen seti sen jälkeen
      useEffect(() => {
          //console.log("EFFECT SCROLL POSITION");
          handleScrollPosition()
      }, [])
   */

    const _clearWorkout = () => {
        dispatch(clearWorkout())
        dispatch(clearExercises())
        dispatch(clearSets())
        dispatch(stopWatch())
        dispatch(resetWorkout())
    }

    const handleClick = () => {
        if (isWorkoutActive && !showCopyWorkoutModal) {
            setShowCopyWorkoutModal(true)
            return
        }

        _clearWorkout()

        dispatch(expand())
        dispatch(startWorkout())
        
    }

    return (
        <>
            <HideAppBar drawerWidth={drawerWidth} >
                <WorkoutToolbar />
            </HideAppBar>

            <Stack padding={3} paddingBottom={20} spacing={2} alignItems="center">
                < Stack spacing={2} padding={3}>
                    {!isWorkoutActive &&
                        <>
                            <Typography variant="h5" textAlign={'center'}> Hello {user.firstname}! &#128075;</Typography>
                            <Typography variant="h5" textAlign={'center'}>Time to workout?</Typography>
                        </>
                    }
                    {isWorkoutActive &&
                        <>
                            <Box
                                sx={{
                                    borderRadius: 2,
                                    padding: 1.5,
                                    textAlign: 'center',
                                    //animation: `${blink} 1s linear infinite alternate`,
                                }}
                            >
                                <Typography variant="h5" textAlign={'center'}>You have a workout in progress! &#128170;</Typography>
                            </Box>
                            <Box display={'flex'} justifyContent={'center'}>
                                <img style={{ padding: 10, width: 300, height: 'auto' }} src={getRandomMemeGif()} alt="Yeah buddy!" />
                            </Box>


                        </>
                    }
                </Stack>

                {/* {workoutStarted &&
                    <>
                        <Button
                            variant="contained"
                            component={Link} to={`/workout`}
                            onClick={handleClick2}
                            color={'error'}
                            sx={{
                                maxWidth: 0.8,
                                padding: 1.5,
                                textAlign: 'center',
                                animation: `${blink} 1s linear infinite alternate`,
                            }}
                        >
                            <>Workout in progress!</> <ArrowForwardIcon sx={{ marginLeft: 1 }} />
                        </Button>
                        <Divider orientation="horizontal" flexItem>
                            start again?
                        </Divider>
                    </>
                } */}
                <Button variant="text" onClick={handleClick} sx={{ maxWidth: 0.8 }} >
                    Start a new workout
                </Button>
                <Divider orientation="horizontal" flexItem> or </Divider>
                <Button variant="text" sx={{ maxWidth: 0.8 }} component={Link} to='/history' >
                    Select from history
                </Button>
                <Divider orientation="horizontal" flexItem> or </Divider>
                <Typography variant="h6" textAlign="center">
                    Select a saved template (Feature not implemented yet.)
                </Typography>

            </Stack >

            {showCopyWorkoutModal &&
                <CopyWorkoutModal
                    open={showCopyWorkoutModal}
                    onClose={setShowCopyWorkoutModal}
                    copyFunction={handleClick}
                />
            }

        </>
    )
}

export default Home