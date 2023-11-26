import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';

import Slide from '@mui/material/Slide';

import { Button, Stack, Divider } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';

import StopWatch from '../Clock/StopWatch';

import useMediaQuery from '@mui/material/useMediaQuery';


export const HideOnScroll = (props) => {
    const { children, window } = props;
    // console.log("hinde", window);
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    })


    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    )
}


const HideAppBar = (props) => {
    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    const stopWatchIsActive = useSelector(state => state.stopWatch.isActive)



    const isSmallScreen = useMediaQuery('(min-width:900px)');


    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar
                    //style={{ width: isSmallScreen ? '100%' : '50%' }}
                    position="fixed"
                    sx={{
                        width: isSmallScreen ? `calc(100% - ${props.drawerWidth}px)` : '100%' ,
                       

                        // width: `calc(100% - ${props.drawerWidth}px)`,
                        //ml: `${props.drawerWidth}px`,
                        /* "& .MuiAppBar-root": {
                            width: '20'
                            "@media (max-width: 768px)": {
                                width: "250",
                                ml: "250"
                            }
                        }, */


                    }}


                >

                    {/* <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            Permanent drawerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
                        </Typography>
                    </Toolbar> */}

                    <Toolbar disableGutters={false} >
                        <Stack
                            direction="row"
                            justifyContent={'space-between'}
                            width={1}
                        >

                            {props.children}
                        </Stack>
                    </Toolbar>
                    {workoutStarted && stopWatchIsActive &&
                        <Toolbar sx={{ justifyContent: "center" }} >
                            <StopWatch></StopWatch>
                        </Toolbar>
                    }
                </AppBar>
            </HideOnScroll>
        </React.Fragment >
    )
}

export default HideAppBar