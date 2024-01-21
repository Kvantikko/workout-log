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

import { getScrollbarWidth } from '../../utils/ScrollBarWidth';


export const HideOnScroll = (props) => {
    const { children, window } = props;
    const isSmallScreen = useMediaQuery('(min-width:900px)');

    const trigger =  useScrollTrigger({  // isSmallScreen ? null :
        target: !isSmallScreen && document.getElementById('main') ? document.getElementById('main') : undefined
        //target: window ? window() : undefined,
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

    const ScrollBarWidth = getScrollbarWidth()

    const isSmallScreen = useMediaQuery('(min-width:900px)');

    const calculateWidth = () => {
        if (workoutStarted) {
            return 0
        }
    }


    return (
        <React.Fragment>
            <CssBaseline />
          {/*   <HideOnScroll {...props}> */}
                <AppBar
                    //style={{ width: isSmallScreen ? '100%' : '50%' }}
                    position="fixed"
                    sx={{
                        //backgroundColor: "black",//'#080808',
                        width: {
                            xs: '100%',
                            sm: '100%',
                            md: workoutStarted ? `calc(100% - ${75 + 400}px)` : `calc(100% - ${75}px)`,
                            lg: workoutStarted ? `calc(100% - ${75 + 500}px)` : `calc(100% - ${225}px)`,
                            xl: workoutStarted ? `calc(100% - ${225 + 500}px)` : `calc(100% - ${225}px)`
                        },



                        right: workoutStarted
                            ?
                            {
                            
                                md: 400,
                                lg: 500
                            }
                            : 0


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

                 

                    <Toolbar disableGutters={false} >
                        <Stack
                            direction="row"
                            justifyContent={'space-between'}
                            width={1}
                        >

                            {props.children}
                        </Stack>
                    </Toolbar>
              
                </AppBar>
          {/*   </HideOnScroll> */}
        </React.Fragment >
    )
}

export default HideAppBar