import * as React from 'react';

import { Link } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import StraightenIcon from '@mui/icons-material/Straighten';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function FixedBottomNavigation({ pageIndex, setPageIndex  }) {
    //const [valuee, setValuee] = React.useState(0);
    const ref = React.useRef(null);

   // console.log("value ", pageIndex);

    

    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={pageIndex}
                    onChange={(event, newPageIndex) => {
                        //console.log("newvalue ", newPageIndex);
                        setPageIndex(newPageIndex);
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

