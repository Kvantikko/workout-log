import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { Box, Fade, Stack } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ActiveWorkout from '../Workout/Workout';
import { useSelector, useDispatch } from 'react-redux';

import useMediaQuery from '@mui/material/useMediaQuery';
import FixedBottomNavigation from '../Navbar/BottomNavBar';
import { BottomNavigation } from '@mui/material';
import WorkoutToolbar from '../Workout/WorkoutToolbar';


import { expand, unExpand } from '../../redux/reducers/drawerReducer';
import StopWatch from '../Clock/StopWatch';

const drawerBleeding = 56;

const Root = React.memo(styled('div')(({ theme }) => ({
    height: '100%',
    onTouch: () => console.log("dawdwd"),
    backgroundColor:
        theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,

})))

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],


}))

function SwipeableEdgeDrawer(props) {
    console.log('------------- Rendering SwipeableEdgeDrawer -----------');

    const { window } = props;
    const [open, setOpen] = React.useState(true);
    const isAuthenticated = !(Object.keys(useSelector(state => state.user)).length === 0) // is user obj empty?

    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const isWorkoutActive = useSelector(state => state.workout.workoutStarted)



    const dispatch = useDispatch()

    const toggleDrawer = (event) => {
        console.log("TOGGLE DRAWER ", event);
        if (event === 'click') {
            console.log('paskaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        }

        console.log("häh");

        if (open) {
            setOpen(false);
            dispatch(unExpand())

        } else {
            setOpen(true);
            dispatch(expand())

        }
        //setOpen(newOpen);
    };

    const handleOpen = () => {
        console.log('PILUUUUUUUUUUUUUUUU');
        if (open) return
        toggleDrawer(true)
        dispatch(expand())
    }



    // This is used only for the example
    /* const container = window !== undefined ? () => window().document.body : undefined; */

    return (
        <>
            {isSmallScreen && isWorkoutActive && isAuthenticated ?
                <Root >

                    {<Global
                        styles={{
                            '.MuiDrawer-root > .MuiPaper-root': {
                                height: '90%', //`calc(90% - ${drawerBleeding}px)`,
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
                        onClose={(event) => toggleDrawer(event)}
                        onOpen={(event) => toggleDrawer(event)}
                        //onTouchMove={() => console.log('move')}
                        //onTouchEnd={() => console.log("end")}
                        //onTouchStart={() => console.log("beign")}
                        swipeAreaWidth={drawerBleeding * 2}
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
                                top: -100,
                                visibility: 'visible',
                                right: 0,
                                left: 0,
                                //backgroundColor: theme => theme.palette.error.main,
                                height: 100,

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