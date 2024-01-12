import * as React from 'react'

import {
    Box,
    Divider,
    Drawer,
    List,
    Typography,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Button,
    ThemeProvider,
    createTheme,
    alpha
} from "@mui/material"

import StraightenIcon from '@mui/icons-material/Straighten';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HomeIcon from '@mui/icons-material/Home';

import { blink } from '../../utils/Blink';

import { Link as ReactRouterLink, useLocation, useMatch, useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';




const theme = createTheme({
    typography: {
        fontFamily: ["Tourney", "italic"].join(","),
        color: "red",
    },
});

const PermanentDrawerLeft = ({ drawerWidth }) => {

    const navLocations = useSelector(state => state.nav)
    const isAuthenticated = useSelector(state => state.user) ? true : false
    const navigate = useNavigate()

    const isSmallScreen = useMediaQuery('(max-width:1200px)');
    const isSmallScreen2 = useMediaQuery('(max-width:1535px)');

    const isWorkoutActive = useSelector(state => state.workout.workoutStarted)
    const isExpanded = useSelector(state => state.drawer)

    const matchExercise = useMatch('/exercises/:id')
    const matchHistory = useMatch('/history/:id')
    const matchMeasure = useMatch('/measure/:id')

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
            case `/exercises/${matchExercise?.params.id}`:
                return 2
            case "/measure":
                return 3
            case `/measure/${matchMeasure?.params.id}`:
                return 3
            case "/profile":
                return 4
            default:
                return 0
        }
    }

    return isAuthenticated && (
        <>
            <Drawer
                sx={{
                    //overflow: "hidden",
                    zIndex: 1499,
                    width: drawerWidth,
                    flexShrink: 0,
                    display: { xs: 'none', md: 'block' },
                    //backgroundColor: theme => theme.palette.action.hover,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        bgcolor: theme => theme.palette.action.hover,
                        overflow: "hidden",
                    },
                    '& .Mui-selected': {
                        color: theme => theme.palette.info.light,
                        borderLeft: {
                            xs: `3px solid #03a9f4`,
                            md: `3px solid #03a9f4`,
                            lg: isWorkoutActive ? `3px solid #03a9f4` : `0px solid #03a9f4`,
                            xl: `0px solid #03a9f4`
                        },
                        borderRadius: {
                            xs: 0,
                            md: 0,
                            lg: isWorkoutActive ? 0 : 2,
                            xl: 2
                        },
                        backgroundColor: {
                            xs: alpha("#617991", 0),
                            md: alpha("#617991", 0),
                            lg: isWorkoutActive ? alpha("#617991", 0) : alpha("#617991", 0.2),
                            xl: alpha("#617991", 0.2)
                        },

                        //borderLeft: `3px solid #ffb74d`,
                        //bgcolor: 'red',
                        //bgcolor: theme => theme.palette.info.light,
                        //borderTop: `2px solid ${theme => theme.palette.secondary.light}`,
                        //borderTop: `3px solid #ffb74d`,
                        //backgroundColor: theme => theme.palette.info.light
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <ThemeProvider theme={theme}>
                    <Button
                        onClick={() => navigate("/")}
                        disableRipple
                        sx={{
                            color: "white",
                            marginTop: 10,
                            marginBottom: 7,
                            display: { xs: 'none', lg: isWorkoutActive ? 'none' : 'block', xl: 'block' },
                            '&:hover, &:focus': {
                                background: "none"
                            },
                        }}
                    >
                        <Typography variant='h4' textAlign={'center'} sx={{
                            '& .MuiTypography-root': {
                                //color: "red"
                            },
                        }}>
                            WORKOUT LOG
                        </Typography>
                    </Button>
                </ThemeProvider>



                <List sx={{ marginY: { xs: 'auto', lg: isWorkoutActive ? 'auto' : 0, xl: 0 } }} >
                    {['Workout', 'History', 'Exercises', 'Measure', 'Profile'].map((text, index) => (
                        <ListItem key={text} disablePadding >
                            <ListItemButton
                                component={ReactRouterLink}
                                //to={`/${text.toLowerCase()}`}
                                to={`/${navLocations[index]}`}
                                selected={pageIndex() === index}

                                sx={{
                                    margin: 0.5,
                                    padding: 1.1,
                                    paddingY: { xs: 2, lg: isWorkoutActive ? 2 : 1, xl: 1 },
                                    marginX: { xs: 0, lg: isWorkoutActive ? 0 : 2, xl: 2 },
                                    '&:hover, &:focus': {
                                        borderRadius: 2
                                    },
                                    /*  '&:focus': {
                                         borderRadius: 2
                                     }, */
                                }}
                                alignItems='center'

                            >
                                <ListItemIcon sx={{
                                    //paddingLeft: { xs: 2, lg: isWorkoutActive ? 2 : 2, xl: 2 },
                                    color: pageIndex() === index ? theme => theme.palette.info.light : '',
                                    //alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Stack justifyContent="center" alignItems={'center'} >
                                        {index === 0 && <HomeIcon /* sx={{ marginRight: 2}} */ />}
                                        {index === 1 && <HistoryIcon />}
                                        {index === 2 && <FitnessCenterIcon />}
                                        {index === 3 && <StraightenIcon />}
                                        {index === 4 && <PersonIcon />}
                                        <Typography
                                            variant='body1'
                                            fontSize={12}
                                            paddingY={0.25}
                                            display={{ xs: 'block', lg: isWorkoutActive ? 'block' : 'none', xl: 'none', }}
                                        /*  position="absolute"
                                         top={36}
                                         right={15} */
                                        >
                                            {text}
                                        </Typography>
                                    </Stack>

                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ paddingLeft: 1.5 }} />
                                {/*  {index === 0 && isWorkoutActive && (pageIndex() !== index) && <Box sx={{
                                    borderRadius: 2,
                                    paddingX: 1.5,
                                    animation: `${blink} 1s linear infinite alternate`,
                                }} > ! </Box>} */}
                            </ListItemButton>

                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}

export default PermanentDrawerLeft