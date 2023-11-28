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

import StraightenIcon from '@mui/icons-material/Straighten';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HomeIcon from '@mui/icons-material/Home';

import { Link as ReactRouterLink, useLocation, useMatch } from 'react-router-dom';

import { useSelector } from 'react-redux';


import { blink } from '../../utils/Blink';


const PermanentDrawerLeft = ({ drawerWidth }) => {

    const navLocations = useSelector(state => state.nav)

    const workoutInProgress = useSelector(state => state.workout.workoutStarted)

    const match = useMatch('/exercises/:id')
    const matchHistory = useMatch('/history/:id')

    const pageIndex = () => {
        switch (location.pathname) {
            case "/workout":
                return 0
            case "/history":
                return 1
            case `/history/${matchHistory?.params.id}`:
                return 1
            case "/exercises":
                return 2
            case `/exercises/${match?.params.id}`:
                return 2
            case "/measure":
                return 3
            case "/profile":
                return 4
            default:
                return 0
        }
    }

    return (
        <>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    display: { xs: 'none', md: 'block' },
                    //backgroundColor: theme => theme.palette.action.hover,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        bgcolor: theme => theme.palette.action.hover,
                    },
                    '& .Mui-selected': {
                        //color: 'red',
                        bgcolor: 'red',
                        //bgcolor: theme => theme.palette.background.default,
                        //borderTop: `2px solid ${theme => theme.palette.secondary.light}`,
                        //borderTop: `3px solid #ffb74d`,
                        backgroundColor: 'red'

                    },

                    //justifyContent: 'center',
                    //flexDirection: 'column'
                }}
                variant="permanent"
                anchor="left"
            >
                {/*  <Toolbar /> */}
                <Typography variant='h3' marginY={5} padding={2} textAlign={'center'}> workout log</Typography>
                <List sx={{ /* margin: 'auto' */ }} >
                    {['Home', 'History', 'Exercises', 'Measure', 'Profile'].map((text, index) => (
                        <ListItem key={text} disablePadding >
                            <ListItemButton
                                component={ReactRouterLink}
                                //to={`/${text.toLowerCase()}`}
                                to={`/${navLocations[index]}`}
                                selected={pageIndex() === index}
                            >
                                <ListItemIcon>
                                    {index === 0 && <HomeIcon />}
                                    {index === 1 && <HistoryIcon />}
                                    {index === 2 && <FitnessCenterIcon />}
                                    {index === 3 && <StraightenIcon />}
                                    {index === 4 && <PersonIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                                {index === 0 && workoutInProgress && (pageIndex() !== index) && <Box sx={{
                                    borderRadius: 2,
                                    paddingX: 1.5,
                                    animation: `${blink} 1s linear infinite alternate`,
                                }} > ! </Box>}
                            </ListItemButton>

                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}

export default PermanentDrawerLeft