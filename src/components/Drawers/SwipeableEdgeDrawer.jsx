import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { Box, Fade, Slide, Grow, Stack, Drawer, AppBar, Toolbar } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Workout from '../Workout/Workout';
import { useSelector, useDispatch } from 'react-redux';

import useMediaQuery from '@mui/material/useMediaQuery';
import FixedBottomNavigation from '../Navbar/BottomNavBar';
import { BottomNavigation } from '@mui/material';
import WorkoutToolbar from '../Toolbars/WorkoutToolbar';


import { expand, unExpand } from '../../redux/reducers/drawerReducer';
import StopWatch from '../Clock/StopWatch';
import HideAppBar from '../AppBar/HideAppBar';
import BasicToolbar from '../Toolbars/BasicToolbar';

const drawerBleeding = 56;

const Root = React.memo(styled('div')(({ theme }) => ({
    height: '100%',
    onTouch: () => console.log("dawdwd"),
    backgroundColor: "black"
    //theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,

})))

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],


}))

function SwipeableEdgeDrawer(props) {
    console.log('------------- Rendering SwipeableEdgeDrawer -----------');

    //const { window } = props

    const open = useSelector(state => state.drawer)
    const isAuthenticated = useSelector(state => state.user) ? true : false
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const isWorkoutActive = useSelector(state => state.workout.workoutStarted)

    const dispatch = useDispatch()

    const toggleDrawer = (event) => {
        if (open) {
            //dispatch(unExpand())
            window.history.back()

        } else {
            dispatch(expand())
        }
    }

    const handleOpen = () => {
        if (open) return
        toggleDrawer(true)
        dispatch(expand())
    }

    // if browser back button is pressed -> closes the drawer
    useEffect(() => {
        console.log("DRAWER EFFECT");
        if (window.location.href.includes("#workout") && open) {
            console.log("TOTTA KU ROTTA")
            //dispatch(expand())

            window.onpopstate = (event) => {
                console.log("POP");
                dispatch(unExpand())
            }
        } else {
            window.onpopstate = null /* () => {
                if (window.location.href.includes("#workout")) {
                    console.log("TOTTA KU ROTTA")
                    dispatch(expand())
                }
            }
            */
        } 



        return (() => { window.onpopstate = null })

    }, [open])

    return (
        <div className="scrollTesttt" component="div">

            <Slide className="scrollTesttt" component="div" direction="up" in={true} /* mountOnEnter unmountOnExit */>
                <div className="scrollTesttt" component="div" >
                    {isSmallScreen && isWorkoutActive && isAuthenticated ?
                        <Drawer
                            component="div"
                            className="scrollTesttt"
                            anchor={"bottom"}
                            variant="temporary"
                            open={open}
                            onClose={(event) => toggleDrawer(event)}
                           // onOpen={(event) => toggleDrawer(event)}
                            ModalProps={{
                                keepMounted: true,
                            }}
                            PaperProps={{
                                sx: {
                                    //width: "90%",
                                    height: 'calc(100% - 0px)',
                                    //top: 6,
                                    //backgroundColor: 'red',
                                    //zIndex: 0
                                    backgroundColor: "black",
                                    //color: "red",

                                }
                            }}
                        >
                            {/*    <DrawerHeader> */}

                            {/* <HideAppBar >
                                <BasicToolbar title="Workout" />
                            </HideAppBar> */}


                            <HideAppBar open={open} /* sx={{ height: { xs: 55 } }}  */>
                                <WorkoutToolbar handleDrawerOpen={toggleDrawer} />
                            </HideAppBar>

                            {/*     </DrawerHeader> */}


                            <Box  component="div" className="scrollTesttt" paddingTop={10}>
                                <div   component="div" className="scrollTesttt" >
                                    <Workout type={'active'} className="scrollTesttt"  component="div" />
                                </div>

                            </Box>


                        </Drawer >
                        :
                        null
                    }
                </div>

            </Slide>


        </div >

    )


    return (
        <>
            {isSmallScreen && isWorkoutActive && isAuthenticated ?
                <Root >

                    {<Global
                        styles={{
                            '.MuiDrawer-root > .MuiPaper-root': {
                                height: '90%', //`calc(90% - ${drawerBleeding}px)`,
                                overflow: 'visible',
                                backgroundColor: "red"



                            },
                        }}
                    />}
                    {/*    <Box sx={{ textAlign: 'center', pt: 1 }}>
                        <Button onClick={toggleDrawer(true)}>Open</Button>
                    </Box> */}



                    <SwipeableDrawer
                        //container={container}
                        anchor="bottom"
                        open={open}
                        onClose={(event) => toggleDrawer(event)}
                        onOpen={(event) => toggleDrawer(event)}
                        //onTouchMove={() => console.log('move')}
                        //onTouchEnd={() => console.log("end")}
                        //onTouchStart={() => console.log("beign")}
                        //swipeAreaWidth={drawerBleeding * 2}
                        disableSwipeToOpen={false}

                        ModalProps={{
                            keepMounted: true,
                            //height: 2400,
                            //zIndex: 0,

                        }}
                        PaperProps={{
                            sx: {
                                width: "90%",
                                height: 'calc(100% - 6px)',
                                top: 6,
                                backgroundColor: 'red',
                                //zIndex: 0
                                backgroundColor: "pink",
                                color: "red",

                            }
                        }}
                        SwipeAreaProps={{

                        }}


                        SlideProps={{
                            sx: {
                                height: 2400,
                                //zIndex: 0

                            }
                        }}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            //backgroundColor: "red",
                            //zIndex: 0,

                            height: 2000,
                            '& .MuiSwipeableDrawer-root': {
                                height: 1000,
                                //backgroundColor: "red"
                            }
                        }}
                    >

                        <StyledBox
                            sx={{
                                position: 'absolute',
                                //top:-drawerBleeding,
                                //top: -100,
                                visibility: 'visible',
                                right: 0,
                                left: 0,
                                //backgroundColor: theme => theme.palette.error.main,
                                //height: 100,

                            }}

                        // onTouchStart={() => console.log('dawd--------------------')}
                        //onTouchMove={() => console.log('dawdawdawdawdawd')}
                        >
                            {open &&
                                <Fade in={true} >
                                    <Box paddingTop={open ? 3.5 : 0.5}>
                                        <WorkoutToolbar handleDrawerOpen={toggleDrawer} />
                                    </Box>
                                </Fade>
                            }

                            {!open &&
                                <Fade in={true} >
                                    <Box display={'flex'} margin='auto' >
                                        {/*  <Typography>Workout in progress:</Typography> */}
                                        <StopWatch timerSize={'h6'} />
                                    </Box>
                                </Fade>
                            }

                        </StyledBox>

                        <StyledBox
                            sx={{
                                px: 0,
                                pb: 0,
                                height: '100%',
                                overflow: 'auto',
                                //backgroundColor: 'green',
                            }}
                        >
                            {/*  <Skeleton variant="rectangular" height="100%">
                        <div>fafadawdwf</div>
                    </Skeleton> */}

                            <ActiveWorkout type={'active'} />

                        </StyledBox>
                    </SwipeableDrawer>

                </Root>

                :
                null
            }
        </>
    )
}

/* SwipeableEdgeDrawer.propTypes = { */
/**
 * Injected by the documentation to work in an iframe.
 * You won't need it on your project.
 */
/*     window: PropTypes.func,
};
 */
export default SwipeableEdgeDrawer