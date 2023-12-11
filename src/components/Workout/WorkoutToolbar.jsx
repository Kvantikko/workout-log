import { Typography, Stack, Box, Button, IconButton, Toolbar, AppBar } from "@mui/material"
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { useDispatch, useSelector } from "react-redux";
import { startWatch } from "../../redux/reducers/stopWatchReducer";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

import { toast } from "react-toastify";

import { useState } from "react";

import { clearWorkout } from "../../redux/reducers/workoutReducer";
import { clearExercises } from "../../redux/reducers/exerciseReducer";
import { clearSets } from "../../redux/reducers/setReducer";
import { stopWatch } from "../../redux/reducers/stopWatchReducer";
import { resetWorkoutPath } from "../../redux/reducers/navReducer"


import Timer from "../Clock/Timer";

import { terminateTimer } from "../../redux/reducers/timerReducer";
import useMediaQuery from '@mui/material/useMediaQuery';
import BasicModal from "../Modals/BasicModal";

import StopWatch from "../Clock/StopWatch";

import SaveWorkoutModal from "../Modals/SaveWorkoutModal";
import { ArrowDownward, Cancel, Close } from "@mui/icons-material";
import HideAppBar from "../AppBar/HideAppBar";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";




const WorkoutToolbar = ({ handleDrawerOpen }) => {
    console.log("Rendering WorkoutToolbar");
    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    const exercises = useSelector(state => state.exercises)
    const stopWatchIsActive = useSelector(state => state.stopWatch.isActive)
    const [showModal, setShowModal] = useState(false)
    const isSmallScreen = useMediaQuery('(min-width:900px)');
    const isExpanded = useSelector(state => state.drawer)

    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [openFinishModal, setOpenFinishModal] = useState(false);


    const dispatch = useDispatch()
    //const navigate = useNavigate()


    const handleModalOpen = () => {
        setShowModal(true)
    }

    const handleFinishClick = () => {
        if (exercises.length === 0) {
            toast.warning('Add at least one exercise before finishing!')
            return
        }
        handleModalOpen()
    }

    const handleClear = () => {
        dispatch(clearWorkout())
        dispatch(clearExercises())
        dispatch(clearSets())
        dispatch(stopWatch())
        dispatch(resetWorkoutPath())
        dispatch(terminateTimer())
        setOpenCancelModal(false)
    }

    const handleOpenFinishModal = () => {
        if (exercises.length === 0) {
            toast.warning('Add at least one exercise before finishing!')
            return
        }
        setOpenFinishModal(true)
    }

    const renderChevron = () => {
        if (!isSmallScreen) return <ArrowDownward></ArrowDownward>

        if (isExpanded) {
            return <ChevronRight />
        } else {
            return <ChevronLeft />
        }
    }



    return (
        /*   <AppBar sx={{ width: { md: 400, lg: 500 } }}> */

        <Stack
            direction={'row'}
            justifyContent={'space-between'}
            paddingRight={2}
            paddingLeft={1}
            paddingY={1.5}
        >

            <Stack
                direction={"row"}
                spacing={{ xs: 1, sm: 2 }}
                //paddingY={1.5}
                overflow={'hidden'}
            >
                <IconButton onClick={handleDrawerOpen} >
                    {renderChevron()}
                </IconButton>

                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} >
                    <Timer size="h5" />
                </Box>
            </Stack>

            <Stack
                direction={"row"}
                spacing={{ xs: 1, sm: 2 }}
                //paddingY={1.5}
                alignSelf={'flex-start'}
            >
                {!stopWatchIsActive &&
                    <IconButton
                        aria-label="stopwatch"
                        sx={{ color: '#90CAF9' }}
                        onClick={() => dispatch(startWatch())}
                    >
                        <TimerOutlinedIcon />
                    </IconButton>
                }
                {workoutStarted && stopWatchIsActive &&
                    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} >
                        <StopWatch showButtons={true} size='h5' />
                    </Box>
                }
                <IconButton aria-label="finish" color="success" onClick={handleOpenFinishModal}>
                    <CheckCircleOutlineIcon />
                </IconButton>
                <SaveWorkoutModal
                    open={openFinishModal}
                    onClose={setOpenFinishModal}
                    type={"active"}
                //confirmFunction={handleClear}
                />

                <IconButton aria-label="cancel" color="error" onClick={() => setOpenCancelModal(true)}>
                    {!isSmallScreen ? <NotInterestedIcon /> : <Close></Close>}
                </IconButton>

                <BasicModal
                    open={openCancelModal}
                    onClose={() => setOpenCancelModal(false)}
                    title="Discard workout?"
                    subTitle="Are you sure you want to discard ongoing workout?"
                    confirmButtonText={'Discard'}
                    cancelButtonText={'Keep logging'}
                    onSubmit={() => handleClear()}
                />

            </Stack>

        </Stack>

        /*  </AppBar> */

    )
}

export default WorkoutToolbar