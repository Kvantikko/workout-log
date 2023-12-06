import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import HideAppBar from '../AppBar/HideAppBar';
import { getScrollbarWidth } from '../../utils/ScrollBarWidth';
import WorkoutToolbar from '../Workout/WorkoutToolbar';
import ActiveWorkout from '../Workout/ActiveWorkout';
import WorkoutAppBar from '../AppBar/WorkoutAppBar';

import { useDispatch, useSelector } from 'react-redux';
import { expand, unExpand } from '../../redux/reducers/drawerReducer';

const drawerWidth = '100vw'

const openedMixin = (theme) => ({
    width: drawerWidth,
    // zIndex: 2000,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    //overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    [theme.breakpoints.up('sm')]: {
        width: 400 //`calc(${theme.spacing(50)} + 1px)`,
    },
    [theme.breakpoints.up('lg')]: {
        width: 500 //`calc(${theme.spacing(50)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up('sm')]: {
        width: 400  //`calc(${theme.spacing(50)} + 1px)`,
    },
    [theme.breakpoints.up('lg')]: {
        width: 500 //`calc(${theme.spacing(50)} + 1px)`,
    },
    //width: { xs: 0, md: 500, lg: 500 },
    left: { md: `calc(100% - ${400}px)`, lg: `calc(100% - ${500}px)` },
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        // marginLeft: drawerWidth,
        //display: 'none',
        marginRight: 0,
        width:  '100%',// `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.up('sm')]: {
            width: '100%' //`calc(${theme.spacing(50)} + 1px)`,
        },
        [theme.breakpoints.up('lg')]: {
            width: '100%' //`calc(${theme.spacing(50)} + 1px)`,
        },
        //left: 0,
        //right: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({

        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
            '& .MuiModal-root': { zIndex: 2000 }
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);




export default function ExpandablePermanentDrawer() {
    console.log("Rendering ExpandablePermanentDrawer");


    const theme = useTheme();
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(true)
    console.log("OPEN ", open);
    const isWorkoutActive = useSelector(state => state.workout.workoutStarted)
    const isAuthenticated = !(Object.keys(useSelector(state => state.user)).length === 0) // is user obj empty?
    const isExpanded = useSelector(state => state.drawer)

    const handleDrawerOpen = () => {
        if (open) {
            setOpen(false);
            dispatch(unExpand())

        } else {
            setOpen(true);
            dispatch(expand())

        }

    };



    return (
        <>
            {isAuthenticated &&
                < Drawer
                    variant="permanent"
                    anchor='right'
                    open={open}
                    sx={{
                        display: isWorkoutActive ? { xs: 'none', md: 'block' } : 'none'
                    }}
                    PaperProps={{
                        sx: {
                          backgroundColor: "#1c1c1c", //theme => theme.palette.divider,
                        }
                      }}
                >
                    <DrawerHeader>
                        {/* <IconButton onClick={handleDrawerOpen}>
                            {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton> */}
                        <AppBar open={open} >
                            <WorkoutToolbar handleDrawerOpen={handleDrawerOpen} />
                        </AppBar>
                    </DrawerHeader>

                    <Box sx={{ paddingTop: 4, paddingX: { md: isExpanded ? 10 : 0, lg: isExpanded ? 10 : 0, xl: isExpanded ? 20 : 0 } }}>
                        <ActiveWorkout />
                    </Box>
                </Drawer >
            }
        </>
    )
}