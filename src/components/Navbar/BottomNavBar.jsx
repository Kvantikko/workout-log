import * as React from 'react';

import { Link, useLocation, useMatch } from 'react-router-dom';

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
//import { makeStyles } from '@mui/styles'; 

/* const useStyles = makeStyles({
    root: {
      width: "100%",
      position: "fixed",
      bottom: 0,
      "& .MuiBottomNavigationAction-root": {
        "@media (max-width: 768px)": {
          minWidth: "auto",
          padding: "6px 0"
        }
      }
    }
  }); */

const FixedBottomNavigation = () => {
    const ref = React.useRef(null)


    const location = useLocation()

    const match = useMatch('/exercises/:id')
    //console.log("MATCH ", match);
    /*  const exercise = match
         ? exercises.find(exercise => exercise.id === Number(match.params.id))
         : null */

    const pageIndex = () => {
        switch (location.pathname) {
            case "/workout":
                return 0
            case "/history":
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
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                
                    showLabels
                    value={pageIndex()}
                    onChange={(event, newPageIndex) => {
                        if (pageIndex() === 0) {
                            sessionStorage.setItem("scrollPosition", window.scrollY);
                        }
                        
                        console.log("SESSION STOR ", sessionStorage.getItem("scrollPosition"));
                        //console.log("newvalue ", newPageIndex);
                        //setPageIndex(newPageIndex);
                    }}
                    sx={{
                        //width: "100%",
                        //position: "fixed",
                        //bottom: 0,

                        //overflow: "auto",
                        //justifyContent: "left",

                        //backgroundColor: "#434445",
                        //display: 'inline',
                        //mx: 1
                        bgcolor: "#1565c0",

                        "& .MuiBottomNavigationAction-root": {
                            "@media (max-width: 768px)": {
                                minWidth: "auto",
                                padding: "6px 0"
                            }
                        },

                        '& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
                            //color: theme => theme.palette.secondary.main
                            color: 'white'
                        },
                        '& .Mui-selected': {
                            //bgcolor: theme => theme.palette.primary.main,
                            //borderTop: `2px solid ${theme => theme.palette.secondary.light}`,
                            borderTop: `3px solid #ffb74d`,
                            '& .MuiBottomNavigationAction-label': {
                                fontSize: theme => theme.typography.caption,
                                //transition: 'none',
                                fontWeight: 'bold',
                                lineHeight: '20px',
                                //bgcolor: "black",
                            },
                            /* '& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
                                //color: theme => theme.palette.secondary.main
                                color: 'white',
                                
                            } */
                            '& .MuiSvgIcon-root': {
                                //color: theme => theme.palette.secondary.main
                                color: theme => theme.palette.warning.light
                                
                            },
                            '& .MuiBottomNavigationAction-label': {
                                //color: theme => theme.palette.secondary.main
                                color: 'white',
                                borderTop: "none",       
                            } 
                        }
                    }}
                >
                    {['Workout', 'History', 'Exercises', 'Measure', 'Profile'].map((text, index) => (
                        <BottomNavigationAction
                            key={text}
                            component={Link}
                            to={`/${text.toLowerCase()}`}
                            label={text}
                            //onClick={() => console.log("clicked")}
                            //color='red'
                            // onClick={() => setPage(text)}
                            icon={
                                index === 0 && <AddIcon color='red' /> ||
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