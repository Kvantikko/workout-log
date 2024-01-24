





import * as React from 'react';

import { Link, useLocation, useMatch } from 'react-router-dom';
import { Box, Slide, Fade } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import StraightenIcon from '@mui/icons-material/Straighten';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HomeIcon from '@mui/icons-material/Home';
import { Badge } from '@mui/material';

const BottomNavBar = ({ pageIndex, isAuthenticated, navLocations }) => {

    return isAuthenticated && (
        <Box sx={{ pb: 7 }} >
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>

                <BottomNavigation
                    //style={{ zIndex: 1500 }}
                    showLabels
                    value={pageIndex()}
                    onChange={(event, newPageIndex) => {
                        if (pageIndex() === 0) {
                            sessionStorage.setItem("scrollPosition", window.scrollY);
                        }
                    }}
                    sx={{
                        zIndex: 3000,
                        bgcolor: "rgba(255, 255, 255, 0.08)",
                        "& .MuiBottomNavigationAction-root": {
                            "@media (max-width: 768px)": {
                                minWidth: "auto",
                                padding: "6px 0",
                                zIndex: 3000
                            }
                        },
                        "& .MuiBottomNavigation-root": {
                            zIndex: 3000
                        },
                    }}
                >
                    {['Workout', 'History', 'Exercises', 'Measure', 'Profile'].map((text, index) => (
                        <BottomNavigationAction
                            key={text}
                            component={Link}
                            //to={`/${text.toLowerCase()}`}
                            to={`/${navLocations[index]}`}
                            label={text}
                            icon={
                                /* (
                                    index === 0 &&
                                    workoutInProgress &&
                                    pageIndex() !== 0 &&
                                    <Badge variant='dot' color="error"> <HomeIcon /> </Badge>
                                )
                                || */
                                index === 0 && <HomeIcon />
                                ||
                                index === 1 && <HistoryIcon />
                                ||
                                index === 2 && <FitnessCenterIcon />
                                ||
                                index === 3 && <StraightenIcon />
                                ||
                                index === 4 && <PersonIcon />
                            }
                        />
                    ))}
                </BottomNavigation>

            </Paper>
        </Box>
    );
}

export default BottomNavBar 
