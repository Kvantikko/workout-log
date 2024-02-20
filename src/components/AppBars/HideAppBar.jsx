import * as React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { useMediaQuery,  useScrollTrigger, AppBar, Typography, Toolbar, Slide, Button, Stack, Divider, Box } from '@mui/material'

export const HideOnScroll = (props) => {
    const { children, window } = props;
    const isSmallScreen = useMediaQuery('(min-width:900px)');

    const trigger = useScrollTrigger({  // isSmallScreen ? null :
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
    const isSmallScreen = useMediaQuery('(min-width:900px)');

    return (
        <>
            {/*   <HideOnScroll {...props}> */}
            <AppBar
                //style={{ width: isSmallScreen ? '100%' : '50%' }}
                //position="fixed"
                sx={{
                    transition: "all 0.35s ",
                    //backgroundColor: "black",//'#080808',
                    /*    
                       width: {
                           xs: '100%',
                           sm: '100%',
                           md: workoutStarted ? `calc(100% - ${75 + 400}px)` : `calc(100% - ${75}px)`,
                           lg: workoutStarted ? `calc(100% - ${75 + 500}px)` : `calc(100% - ${225}px)`,
                           xl: workoutStarted ? `calc(100% - ${225 + 500}px)` : `calc(100% - ${225}px)`
                       }, */

                    //transition: "width 0.5s",
                    left: { xs: 0, md: 75, lg: workoutStarted ? 75 : 225, xl: 225 }
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
                <Toolbar disableGutters={false}
                    sx={{
                        transition: "width 0.3s",
                        width: {
                            xs: '100%',
                            sm: '100%',
                            md: workoutStarted ? `calc(100% - ${75 + 400}px)` : `calc(100% - ${75}px)`,
                            lg: workoutStarted ? `calc(100% - ${75 + 500}px)` : `calc(100% - ${225}px)`,
                            xl: workoutStarted ? `calc(100% - ${225 + 500}px)` : `calc(100% - ${225}px)`
                        }
                    }}
                >
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
        </>
    )
}

export default HideAppBar