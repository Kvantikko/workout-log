
import { useEffect, useState } from "react"

import { Link, Outlet, useLocation } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { setWorkoutPath, resetWorkoutPath } from "../redux/reducers/navReducer"
import { startWorkout } from "../redux/reducers/workoutReducer"

import { Button, IconButton, Stack, Divider, Box, Typography, Toolbar, Paper } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

import WorkoutCardList from "../components/Lists/WorkoutCardList"
import CreateTemplateModal from "../components/Modals/EditWorkoutModal"
import BasicToolbar from "../components/Toolbars/BasicToolbar"
import BasicModal from "../components/Modals/BasicModal"
import HideAppBar from "../components/AppBars/HideAppBar"

import { keyframes } from '@mui/system';
import { blink } from "../utils/blink"
import { expand, unExpand } from "../redux/reducers/drawerReducer"
import { createPortal } from "react-dom"

const Home = () => {

    const user = useSelector(state => state.user)
    const templates = useSelector(state => state.templates)
    const isWorkoutActive = useSelector(state => state.workout.workoutStarted)
    const [openCopyModal, setOpenCopyModal] = useState(false)
    const [openTemplateModal, setOpenTemplateModal] = useState(false)

    const dispatch = useDispatch()
    const location = useLocation()

    const copy = () => {
        setOpenCopyModal(false)
        dispatch(startWorkout(isWorkoutActive))
    }

    const handleClick = () => {
        if (isWorkoutActive) {
            setOpenCopyModal(true)
            return
        }
        copy()
    }

    const handleCardClick = (event, workoutId) => {
        dispatch(setWorkoutPath(`templates/${workoutId}`))
        //navigate(`/history/${workoutId}`)  tätä ei toistaseksi tarvi ku kortti on linkki componentti
    }

    return (
        <>
            <HideAppBar>
                <BasicToolbar title="Workout" />
            </HideAppBar>
            {/* <Paper>
                <Toolbar> <BasicToolbar title="Workout" /></Toolbar>
            </Paper> */}

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
                            <Typography variant="h5" textAlign={'center'}>Yeeea buddeee!</Typography>
                            <Typography variant="h5" textAlign={'center'}>You have a workout in progress! &#128170;</Typography>
                        </>
                    }
                </Stack>

                <Button
                    variant="text"
                    sx={{ width: 0.75 }}
                    component={Link}
                    to='/workout-template'
                    state={{ previousLocation: location }}
                >
                    Modal testi
                </Button>

                <Button variant="text" sx={{ width: 0.75 }} onClick={handleClick}  >
                    Start a new workout
                </Button>
                <Divider orientation="horizontal" flexItem> or </Divider>
                <Button variant="text" sx={{ width: 0.75 }} component={Link} to='/history' >
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
                            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} >
                                <IconButton sx={{ color: '#90CAF9', padding: 1 }} onClick={() => setOpenTemplateModal(true)}>
                                    <AddIcon />
                                </IconButton>
                            </Box>
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
                    type="template"
                />
            }

            <Outlet></Outlet>

        </>
    )
}

export default Home