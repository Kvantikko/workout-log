import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';

import { styled, alpha } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TimerIcon from '@mui/icons-material/Timer';

import InputBase from '@mui/material/InputBase';


import { Button, Stack, Divider } from '@mui/material';

import DiscardWorkoutModal from '../Workout/DiscardWorkoutModal';
import SaveWorkoutModal from '../Workout/SaveWorkoutModal';

import { useSelector, useDispatch } from 'react-redux';

import { startWatch } from '../../redux/reducers/stopWatchReducer';

import ModalRoot from '../Modals/ModalRoot';


import StopWatch from '../Clock/StopWatch';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export const HideOnScroll = (props) => {
    const { children, window } = props;
   // console.log("hinde", window);
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    //console.log("triggggger ", trigger);

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}


const HideAppBar = (props) => {

    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    const stopWatchIsActive = useSelector(state => state.stopWatch.isActive)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false)

    const renderWorkoutToolButtons = () => {
        if (workoutStarted) {
            return (
                <Stack direction={"row"} spacing={1}>
                    {!stopWatchIsActive &&
                        <Button variant="contained" onClick={() => dispatch(startWatch())}>
                            <TimerIcon />
                        </Button>}
                    {/*  <CancelWorkoutModal></DiscardWorkoutModal>
                    <SaveWorkoutModal></SaveWorkoutModal> */}

                </Stack>
            )
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar >
                    <Toolbar >
                        <Stack direction="row" spacing={2} sx={{ width: '1', justifyContent: 'space-between' }} >
                            {props.children}
                            {/* {props.pageIndex === 0 &&
                                <>
                                    <Typography variant="h6" component="div">
                                        Workout
                                    </Typography>
                                    {renderWorkoutToolButtons()}
                                </>
                            }
                            {props.pageIndex === 1 &&
                                <>
                                    <Typography variant="h6" component="div">
                                        History
                                    </Typography>
                                    <Button variant='contained'>
                                        <CalendarMonthIcon />
                                    </Button>
                                </>
                            }
                            {props.pageIndex === 2 &&
                                <>
                                    <Typography variant="h6" component="div">
                                        Exercises
                                    </Typography>
                                    <Search>
                                        <SearchIconWrapper>
                                            <SearchIcon />
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            placeholder="Search…"
                                            inputProps={{ 'aria-label': 'search' }}
                                            onChange={(event) => props.setInput(event.target.value)}
                                        />
                                    </Search>
                                    <Button variant="contained" onClick={() => setOpen(true)}>Add</Button>
                                    <ModalRoot
                                        open={open} setOpen={setOpen} modalType={"createExercise"}></ModalRoot>
                                </>
                            }
                            {props.pageIndex === 3 &&
                                <>
                                    <Typography variant="h6" component="div">
                                        Measurements
                                    </Typography>
                                </>
                            }
                            {props.pageIndex === 4 &&
                                <>
                                    <Typography variant="h6" component="div">
                                        Profile
                                    </Typography>
                                </>
                            } */}
                        </Stack>
                    </Toolbar>
                    {workoutStarted && stopWatchIsActive &&
                        <Toolbar>
                            <StopWatch></StopWatch>
                        </Toolbar>
                    }
                </AppBar>
            </HideOnScroll>
        </React.Fragment >
    );
}

export default HideAppBar