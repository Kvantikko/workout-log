import * as React from 'react';

import { Link } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

import StraightenIcon from '@mui/icons-material/Straighten';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useLocation } from 'react-router-dom';

const FixedBottomNavigation = () => {
    const ref = React.useRef(null)

    const location = useLocation()

    const pageIndex = () => {
        switch (location.pathname) {
            case "/workout":
                return 0
            case "/history":
                return 1
            case "/exercises":
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
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={pageIndex()}
                    onChange={(event, newPageIndex) => {
                        //console.log("newvalue ", newPageIndex);
                        //setPageIndex(newPageIndex);
                    }}
                    sx={{
                        overflow: "auto",
                        justifyContent: "left",
                        //display: 'inline',
                        //mx: 1
                    }}
                >
                    {['Workout', 'History', 'Exercises', 'Measure', 'Profile'].map((text, index) => (
                        <BottomNavigationAction
                            key={text}
                            component={Link}
                            to={`/${text.toLowerCase()}`}
                            label={text}
                            // onClick={() => setPage(text)}
                            icon={
                                index === 0 && <AddIcon /> ||
                                index === 1 && <HistoryIcon /> ||
                                index === 2 && <FitnessCenterIcon /> ||
                                index === 3 && <StraightenIcon /> ||
                                index === 4 && <PersonIcon />
                            }
                        />
                    ))}
                </BottomNavigation>
            </Paper>
        </Box>
    );
}

export default FixedBottomNavigation
