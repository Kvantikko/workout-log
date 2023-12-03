import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ActiveWorkout from '../Workout/ActiveWorkout';
import WorkoutToolbar from '../Workout/WorkoutToolbar';
import { useSelector } from 'react-redux';

//const drawerWidth = 500;

export default function PermanentDrawerRight() {
    console.log("---------------- Rendering PermanentDrawerRigth --------------------");

    const isAuthenticated = !(Object.keys(useSelector(state => state.user)).length === 0) // is user obj empty?
    const isWorkoutActive = useSelector(state => state.workout.workoutStarted)

    return (
        <>
            {/* <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }}
                >
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            Permanent drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <Toolbar />
                    <Typography>dadawdwadawdddddddddddddddddddd</Typography>

                </Box> */}


            {isAuthenticated && isWorkoutActive &&

                <Drawer
                    /* sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="right" */


                    sx={{
                        width: { xs: 'none', md: 400, lg: 500 },
                      
                        flexShrink: 0,
                        display: { xs: 'none', md: 'block' },
                        //backgroundColor: theme => theme.palette.action.hover,
                        '& .MuiDrawer-paper': {
                            width: { xs: 'none', md: 400, lg: 500 },
                            boxSizing: 'border-box',
                            bgcolor: theme => theme.palette.action.hover,
                            marginTop: 8
                        },


                        //justifyContent: 'center',
                        //flexDirection: 'column'
                    }}
                    //variant="permanent"
                    anchor="right"
                >
                    <WorkoutToolbar />
                    <Box sx={{ paddingTop: 4 }}>
                        <ActiveWorkout/>
                    </Box>





                </Drawer>

            }
        </>

    )
}

