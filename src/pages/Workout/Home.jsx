import { Link } from "react-router-dom"
import ActiveWorkout from "../../components/Workout/WorkoutContainer"
import { useEffect, useState } from "react"
import { Button, IconButton, Stack, Divider, Container, Box, Modal, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

import { startWorkout } from "../../redux/reducers/workoutReducer"


import WorkoutToolbar from "../../components/Toolbars/HomeToolbar"
import HideAppBar from "../../components/AppBar/HideAppBar"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import PermanentDrawerLeft from "../../components/Navbar/PermanentDrawerLeft"

import { useNavigate } from "react-router-dom"

import { clearWorkout } from "../../redux/reducers/workoutReducer";
import { clearExercises } from "../../redux/reducers/exerciseReducer";
import { clearSets } from "../../redux/reducers/setReducer";
import { stopWatch } from "../../redux/reducers/stopWatchReducer";

import { keyframes } from '@mui/system';

import { blink } from "../../utils/Blink"

import { expand, unExpand } from "../../redux/reducers/drawerReducer"

import { createPortal } from "react-dom"
import SwipeableEdgeDrawer from "../../components/Drawers/SwipeableEdgeDrawer"

import { setWorkoutPath, resetWorkoutPath } from "../../redux/reducers/navReducer"

import coleman from '../../assets/coleman.gif'

import schwarzenegger from '../../assets/schwarzenegger.gif'
import AddIcon from "@mui/icons-material/Add"
import WorkoutCardList from "../../components/Lists/WorkoutCardList"
import CreateTemplateModal from "../../components/Modals/CreateEditWorkoutModal"

const gifArray = [coleman, schwarzenegger]

const getRandomMemeGif = () => {
    const max = gifArray.length
    const min = 0
    const random = Math.floor(Math.random() * (max - min) + min)
    return gifArray[random]
}

const Home = ({ user, drawerWidth }) => {

    console.log("Rendering Home")

    const templates = useSelector(state => state.templates)

    const isWorkoutActive = useSelector(state => state.workout.workoutStarted)

    const [openCopyModal, setOpenCopyModal] = useState(false)
    const [openTemplateModal, setOpenTemplateModal] = useState(false)

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
        dispatch(resetWorkoutPath())
    }

    const handleClick = () => {
        if (isWorkoutActive && !openCopyModal) {
            setOpenCopyModal(true)
            return
        }

        _clearWorkout()

        dispatch(expand())
        dispatch(startWorkout())

    }

    const handleCardClick = (event, workoutId) => {
        //event.preventDefault()
        //console.log("handling click");
        dispatch(setWorkoutPath(`templates/${workoutId}`))
        //navigate(`/history/${workoutId}`)  tätä ei toistaseksi tarvi ku kortti on linkki componentti
    }

    return (
        <>
            <HideAppBar drawerWidth={drawerWidth} >
                <WorkoutToolbar />
            </HideAppBar>

            <Stack padding={2} paddingBottom={20} spacing={2} alignItems="center" >
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
                    Select a template
                </Typography>

                {templates.length === 0 &&
                    <Stack spacing={2} paddingTop={4}>
                        <Typography variant="body1" textAlign="center">
                            You haven't created any templates yet.
                        </Typography>
                        <Button onClick={() => setOpenTemplateModal(true)} >
                            <AddIcon sx={{ marginRight: 1 }} />
                            Create a template
                        </Button>
                    </Stack>
                }

                {!(templates.length === 0) &&
                    <Box width={{ xs: '100%', sm: '80%' }}>
                        <Stack direction={'row'} justifyContent={'space-between'} >
                            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} paddingY={2}>
                                <Typography variant="body1" textAlign="center">
                                    My templates
                                </Typography>
                            </Box>
                            <IconButton sx={{ color: '#90CAF9', padding: 0 }} onClick={() => setOpenTemplateModal(true)}>
                                <AddIcon />
                            </IconButton>
                        </Stack>
                        <WorkoutCardList workouts={templates} path="templates" onItemClick={handleCardClick} />
                    </Box>
                }


            </Stack >

            {openCopyModal &&
                <BasicModal
                    open={openCopyModal}
                    onClose={() => setOpenCopyModal(false)}
                    title="Workout in progress!"
                    subTitle="You have a workout in progress.
                    Are you sure you want to override the current workout?"
                    onSubmit={() => copy()}
                />
            }

            {openTemplateModal &&
                <CreateTemplateModal
                    open={openTemplateModal}
                    onClose={setOpenTemplateModal}
                    title="Create template"
                />
            }

        </>
    )
}

export default Home