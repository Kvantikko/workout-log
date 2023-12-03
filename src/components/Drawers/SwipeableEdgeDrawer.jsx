import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ActiveWorkout from '../Workout/ActiveWorkout';
import { useSelector } from 'react-redux';

import useMediaQuery from '@mui/material/useMediaQuery';
import FixedBottomNavigation from '../Navbar/BottomNavBar';
import { BottomNavigation } from '@mui/material';
import WorkoutToolbar from '../Workout/WorkoutToolbar';

const drawerBleeding = 56;

const Root = React.memo(styled('div')(({ theme }) => ({
    height: '100%',
    //zIndex: 0,
    backgroundColor:
        theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,

})))

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],

}))

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}))

function SwipeableEdgeDrawer(props) {
    console.log('------------- Rendering SwipeableEdgeDrawer -----------');

    const { window } = props;
    const [open, setOpen] = React.useState(false);
    const isAuthenticated = !(Object.keys(useSelector(state => state.user)).length === 0) // is user obj empty?

    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const isWorkoutActive = useSelector(state => state.workout.workoutStarted)

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    // This is used only for the example
    /* const container = window !== undefined ? () => window().document.body : undefined; */

    return (
        <>
            {isSmallScreen && isWorkoutActive ?
                <Root>

                    {<Global
                        styles={{
                            '.MuiDrawer-root > .MuiPaper-root': {
                                height: `calc(90% - ${drawerBleeding}px)`,
                                overflow: 'visible',



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
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                        onTouchStart={() => console.log("beign")}
                        swipeAreaWidth={drawerBleeding * 2}
                        disableSwipeToOpen={false}

                        ModalProps={{
                            keepMounted: true,
                            height: 2400,
                            //zIndex: 0,

                        }}
                        PaperProps={{
                            sx: {
                                width: "90%",
                                height: 'calc(100% - 6px)',
                                top: 6,
                                backgroundColor: 'red',
                                //zIndex: 0

                            }
                        }}



                        SlideProps={{
                            sx: {
                                height: 2400,
                                //zIndex: 0

                            }
                        }}
                        sx={{
                            display: { xs: 'block', md: 'none' },

                            //zIndex: 0,

                            height: 2000,
                            '& .MuiSwipeableDrawer-root': {
                                height: 1000,
                                // zIndex: 0,
                            }
                        }}


                    >
                        <StyledBox
                            sx={{
                                position: 'absolute',
                                //top:-drawerBleeding,
                                top: -112,
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                                visibility: 'visible',
                                right: 0,
                                left: 0,
                               // backgroundColor: 'red',
                                height: 112
                            }}
                        
                            onTouch={() => setOpen(true)}

                        /*  onClick() */
                        >
                         {/*    <WorkoutToolbar></WorkoutToolbar> */}
                            <Puller onClick={() => console.log('dawdwadwadwadwad')} />


                            {/*      {!open &&
                                <BottomNavigation></BottomNavigation>
                            } */}


                        </StyledBox>
                        <StyledBox
                            sx={{
                                px: 2,
                                pb: 2,
                                height: '100%',
                                overflow: 'auto',
                               // backgroundColor: 'green',
                            }}
                        >
                            {/*  <Skeleton variant="rectangular" height="100%">
                        <div>fafadawdwf</div>
                    </Skeleton> */}

                            <ActiveWorkout />

                        </StyledBox>
                    </SwipeableDrawer>



                </Root>

                : null}</>
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