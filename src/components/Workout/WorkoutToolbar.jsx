import { Typography, Stack, Button, IconButton, Toolbar, AppBar } from "@mui/material"
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { useDispatch, useSelector } from "react-redux";
import { startWatch } from "../../redux/reducers/stopWatchReducer";
import ModalRoot from "../Modals/ModalRoot";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

import { toast } from "react-toastify";

import { useState } from "react";
import ConfirmationModal from "../Modals/ConfirmationModal";

import { clearWorkout } from "../../redux/reducers/workoutReducer";
import { clearExercises } from "../../redux/reducers/exerciseReducer";
import { clearSets } from "../../redux/reducers/setReducer";
import { stopWatch } from "../../redux/reducers/stopWatchReducer";
import { resetWorkout } from "../../redux/reducers/navReducer"

import FormModal from "../Modals/FormModal";




import useMediaQuery from '@mui/material/useMediaQuery';


import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import StopWatch from "../Clock/StopWatch";
import BasicModal from "../Modals/BasicModal";
import CancelWorkoutModal from "../Modals/CancelWorkoutModal";
import FinishWorkoutModal from "../Modals/FinishWorkoutModal";
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
        dispatch(resetWorkout())
        //navigate('/')
    }

    const handleOpenFinishModal = () => {
        if (exercises.length === 0) {
            toast.warning('Add at least one exercise before finishing!')
            return
        }
        setOpenFinishModal(true)
    }

    return (
        <AppBar sx={{ width: { md: 400, lg: 500 } }}>

            <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack
                    direction={"row"}
                    spacing={0}
                    overflow={'hidden'}
                    sx={{
                        //pb: 7,
                        //display: { xs: 'block', md: 'none' },
                    }}
                >
              

                     

                        <IconButton
                          
                            onClick={handleDrawerOpen}
                        >
                               {isExpanded ? <ChevronRight/> : <ChevronLeft/> }
                        </IconButton>

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

                            <StopWatch showButtons={true} timerSize={'h6'} alwaysOn={true}></StopWatch>

                        }

                </Stack>


                {/*  <StopWatch timerSize={'h5'}/> */}
                <Stack
                    direction={"row"}
                    spacing={{ xs: 1, sm: 2 }}
                    paddingY={1.5}
                    alignSelf={'flex-start'}
                >


                    <IconButton aria-label="finish" color="success" onClick={handleOpenFinishModal}>
                        <CheckCircleOutlineIcon />
                    </IconButton>
                    <FinishWorkoutModal
                        open={openFinishModal}
                        onClose={setOpenFinishModal}
                    //confirmFunction={handleClear}
                    />

                    <IconButton aria-label="cancel" color="error" onClick={() => setOpenCancelModal(true)}>
                        {!isSmallScreen ? <NotInterestedIcon /> : <Close></Close>}
                    </IconButton>
                    <CancelWorkoutModal
                        open={openCancelModal}
                        onClose={setOpenCancelModal}
                        confirmFunction={handleClear}
                    />

                </Stack>
            </Stack>

        </AppBar>

    )
}

export default WorkoutToolbar