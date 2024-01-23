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

export default function WorkoutDrawerMobile({ toggleDrawer, open }) {

    console.log('------------- Rendering MOBILE Drawer -----------');

    return (
        <div className="scrollTesttt" component="div">
            <Slide className="scrollTesttt" component="div" direction="up" in={true} /* mountOnEnter unmountOnExit */>
                <div className="scrollTesttt" component="div" >
                    <Drawer
                        component="div"
                        className="scrollTesttt"
                        anchor={"bottom"}
                        variant="temporary"
                        open={open}
                        onClose={toggleDrawer}
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


                        <Box component="div" className="scrollTesttt" paddingTop={10}>
                            <div component="div" className="scrollTesttt" >
                                <Workout type={'active'} className="scrollTesttt" component="div" />
                            </div>

                        </Box>


                    </Drawer >
                </div>
            </Slide>
        </div >

    )
}
