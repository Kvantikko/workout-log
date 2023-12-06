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


const WorkoutAppBar = (props) => {
    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    const stopWatchIsActive = useSelector(state => state.stopWatch.isActive)



    const getScrollbarWidth = () =>
        window.innerWidth - document.documentElement.clientWidth;

    getScrollbarWidth(); 

 

    const isSmallScreen = useMediaQuery('(min-width:900px)');

    const calculateWidth = () => {
        if (workoutStarted) {
            return 0
        }
    }


    return (
        <React.Fragment>
            <CssBaseline />

            <AppBar
                //style={{ width: isSmallScreen ? '100%' : '50%' }}
                position="fixed"
                sx={{
                   // width: 'fit-container',
                    width: {
                        xs: '100%',
                        sm: '100%',
                        md: 400  - getScrollbarWidth(),
                        lg: 500  - getScrollbarWidth(),
                     
                    }, 
                
                    left: { md: `calc(100% - ${400}px)`, lg: `calc(100% - ${500}px)` }



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


                 
                        {props.children}
                   
              
                {/* {workoutStarted && stopWatchIsActive &&
                        <Toolbar sx={{ justifyContent: "center" }} >
                            <StopWatch showButtons={true} timerSize={'h6'} alwaysOn={true}></StopWatch>
                        </Toolbar>
                    } */}
            </AppBar>
            {/*   </HideOnScroll> */}
        </React.Fragment >
    )
}

export default WorkoutAppBar