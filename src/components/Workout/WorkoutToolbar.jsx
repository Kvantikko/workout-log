import { Typography, Stack, Box, Button, IconButton, Toolbar, AppBar } from "@mui/material"
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { useDispatch, useSelector } from "react-redux";
import { setWorker, startWatch, stopWatch, updateTime } from "../../redux/reducers/stopWatchReducer";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

import { toast } from "react-toastify";

import { useState } from "react";

import { endWorkout } from "../../redux/reducers/workoutReducer";

import useMediaQuery from '@mui/material/useMediaQuery';
import BasicModal from "../Modals/BasicModal";

import StopWatch from "../Clock/StopWatch";

import SaveWorkoutModal from "../Modals/SaveWorkoutModal";
import { ArrowDownward, Cancel, Close } from "@mui/icons-material";
import HideAppBar from "../AppBar/HideAppBar";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { postMessageToWorker } from "../Clock/stopWatchWorkerManager";





const WorkoutToolbar = ({ handleDrawerOpen, open, setOpen }) => {
    console.log("Rendering WorkoutToolbar");

    const workoutName = useSelector(state => state.workout.name)
    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    const exercises = useSelector(state => state.workout.exercises.allIds)
    const stopWatchIsActive = useSelector(state => state.stopWatch.isActive)
    const isSmallScreen = useMediaQuery('(min-width:900px)')
    const [openCancelModal, setOpenCancelModal] = useState(false)
    const [openFinishModal, setOpenFinishModal] = useState(false)
    const [openClockModal, setOpenClockModal] = useState(false)
    //const isExpanded = useSelector(state => state.drawer)

    const dispatch = useDispatch()

    const handleClear = () => {
        setOpenCancelModal(false)
        dispatch(endWorkout())
    }

    const handleFinishClick = () => {
        if (exercises.length === 0) {
            toast.warning('Add at least one exercise before finishing!')
            return
        }
        if (workoutName === "" || workoutName === undefined || workoutName === null) {
            toast.warning('Name your workout before finishing!')
            return
        }
        setOpenFinishModal(true)
    }

    const renderChevron = () => {
        if (!isSmallScreen) return <KeyboardArrowDownIcon />

        if (open) {
            return <ChevronRight />
        } else {
            return <ChevronLeft></ChevronLeft>// <OpenInFullIcon />
        }
    }

    
    const handleReset = () => {
        setOpenClockModal(false)
        postMessageToWorker('reset');
        dispatch(stopWatch());
        dispatch(setWorker(false));
        dispatch(updateTime(0));
    };

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


            </Stack>



            <Stack
                direction={"row"}
                spacing={{ xs: 1, sm: 1 }}
                //paddingY={1.5}
                alignSelf={'flex-start'}
            >
                {!stopWatchIsActive &&
                    <IconButton
                        aria-label="stopwatch"
                        sx={{ color: '#90CAF9' }}

                        onClick={() => dispatch(startWatch())}

                    >
                        <TimerOutlinedIcon

                        />
                    </IconButton>
                    /*        :
                           <IconButton
                               aria-label="stopwatch"
                               sx={{ color: '#90CAF9' }}
                               onClick={() => dispatch(stopWatch())}
                           >
                               <TimerOffIcon />
                           </IconButton> */
                }
                {workoutStarted && stopWatchIsActive &&
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} >

                        <IconButton
                            onClick={() => setOpenClockModal(true)}
                            sx={{ marginRight: 1, color: '#90CAF9' }}
                          
                            >
                            <ZoomOutMapIcon />
                        </IconButton>
                        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} >
                            <StopWatch showButtons={true} size='h5' />
                        </Box>
                    </Box>

                }

                <IconButton aria-label="finish" color="success" onClick={handleFinishClick}>
                    <CheckCircleOutlineIcon />
                </IconButton>
                {openFinishModal &&
                    <SaveWorkoutModal
                        open={openFinishModal}
                        onClose={() => setOpenFinishModal(false)}
                        type={"active"}
                    //confirmFunction={handleClear}
                    />
                }


                <IconButton aria-label="cancel" color="error" onClick={() => setOpenCancelModal(true)}>
                    <Close></Close>
                </IconButton>

            </Stack>

            {
                openCancelModal &&
                <BasicModal
                    open={openCancelModal}
                    onClose={() => setOpenCancelModal(false)}
                    title="Discard workout?"
                    subTitle="Are you sure you want to discard ongoing workout?"
                    confirmButtonText={'Discard'}
                    cancelButtonText={'Keep logging'}
                    onSubmit={() => handleClear()}
                />
            }
            {
                openClockModal &&
                <BasicModal
                    open={openClockModal}
                    onClose={() => setOpenClockModal(false)}
                    title="Rest timer"
                    subTitle={<StopWatch size="h1" /* showButtons={true} */ ></StopWatch>}
                    //hideConfirmButton={true}
                    confirmButtonText={'Discard timer'}
                    cancelButtonText={'Close window'}
                    onSubmit={handleReset}
                />
            }
        </Stack >

        /*  </AppBar> */

    )
}

export default WorkoutToolbar