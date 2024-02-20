import * as React from 'react'

import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import { Toolbar, Box, Stack, Slide, Fade, useMediaQuery } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

import WorkoutToolbar from '../Toolbars/WorkoutToolbar'
import Workout from '../Workout/Workout'

const openedMixin = (theme) => ({
    //width: drawerWidth,
    // zIndex: 2000,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('sm')]: {
        width: 400 //`calc(${theme.spacing(50)} + 1px)`,
    },
    [theme.breakpoints.up('lg')]: {
        width: 500 //`calc(${theme.spacing(50)} + 1px)`,
    },
    overflow: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    //overflowY: 'hidden',
    [theme.breakpoints.up('sm')]: {
        width: 0 //`calc(${theme.spacing(50)} + 1px)`,
    },
    [theme.breakpoints.up('lg')]: {
        width: 0 //`calc(${theme.spacing(50)} + 1px)`,
    },
    overflow: 'hidden',
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
})(({ theme, open, isExpanded }) => ({
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up('sm')]: {
        width: 0  //`calc(${theme.spacing(50)} + 1px)`,
    },
    [theme.breakpoints.up('lg')]: {
        width: 0 //`calc(${theme.spacing(50)} + 1px)`,
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
        // width: '100%',// `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.up('sm')]: {
            width: 400 //`calc(${theme.spacing(50)} + 1px)`,
        },
        [theme.breakpoints.up('lg')]: {
            width: 500 //`calc(${theme.spacing(50)} + 1px)`,
        },
        //left: 0,
        //right: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    ...(isExpanded && {
        // marginLeft: drawerWidth,
        //display: 'none',
        marginRight: 0,
        width: '100%',// `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.up('sm')]: {
            width: "100vw" //`calc(${theme.spacing(50)} + 1px)`,
        },
        [theme.breakpoints.up('lg')]: {
            width: "100vw" //`calc(${theme.spacing(50)} + 1px)`,
        },
        //left: 0,
        //right: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        //width: drawerWidth,
        //position: "absolute",
        flexShrink: 0,
        //whiteSpace: 'nowrap',
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
)

export default function WorkoutDrawerDesktop({ toggleDrawer, open, isWorkoutActive }) {

    //console.log("--------------------- Rendering DESKTOP Drawer ---------------------------------- ");

    const isBigScreen = useMediaQuery('(min-width:1200px)')

    function calculate() {
        if (isWorkoutActive && isBigScreen) return 500
        if (isWorkoutActive) return 400
        return "0vw"
    }

    return (
        < Drawer
            sx={{
                '& .MuiDrawer-paper': { width: open ? "100vw" : calculate() }
            }}
            variant="permanent"
            anchor='right'
            open={isWorkoutActive}
            PaperProps={{
                sx: {
                    backgroundColor: "#1c1c1c",
                }
            }}
        >
            <DrawerHeader>
                <AppBar open={isWorkoutActive} isExpanded={open}> {/*isExpanded aiheuttaa logissa errorin...???*/}
                    <Toolbar disableGutters={false} >
                        <Stack
                            direction="row"
                            justifyContent={'space-between'}
                            width={1}
                        >
                            <WorkoutToolbar
                                open={open}
                                handleDrawerOpen={toggleDrawer}
                            />
                        </Stack>
                    </Toolbar>
                </AppBar>
            </DrawerHeader>

            <Box sx={{
                paddingTop: 2,
                paddingX: { md: open ? 10 : 0, lg: open ? 10 : 0, xl: open ? 20 : 0 },
                overflowY: 'auto',
                overflowX: 'hidden'
            }}>
                <Workout type={"active"} />
            </Box>
        </Drawer >
    )
}