import { AppBar, Stack, Typography, Button, Container, Badge, Box, useMediaQuery, IconButton } from "@mui/material"
import StopWatch from "../Clock/StopWatch";
import BasicToolbar from "../Toolbars/BasicToolbar";
import { Close, KeyboardArrowUp, Timer } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { expand } from "../../redux/reducers/drawerReducer";
//import useMediaQuery from '@mui/material/useMediaQuery';

const OngoingWorkoutBar = ({ }) => {

    const isActiveRestWatch = useSelector(state => state.stopWatch.restWatch.isActive)
    const workoutName = useSelector(state => state.workout.name) || "Untitled workout"
    const isAuthenticated = useSelector(state => state.user) ? true : false
    const isWorkoutActive = useSelector(state => state.workout.workoutStarted)

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(expand())
    }

    return isAuthenticated && isWorkoutActive && (
     
            <AppBar
                onClick={() => handleClick()}
                //position="fixed"
                position="absolute"
                color=""
                //elevation={0}
                sx={{
                    top: 'auto',
                    bgcolor: "#295596", //'#222326',
                    // bottom: theme => theme.isSmallScreen ? 0 : 56,
                    //bottom: isSmallScreen ? 0 : 56,
                    justifyContent: "center",
                    bottom: 59,
                    padding: 1,
                    right: "2%",

                    width: 0.96,
                    //width: isSmallScreen ? `calc(100% - ${drawerWidth}px)` :   '100%',
                    display: { xs: 'flex', md: 'none' },
                    borderRadius: 3
                }}
            >

                {/* width={"100%"}
                direction={'row'}
                flexWrap={'wrap'}
                gap={2}
                flexGrow={2} */}


                <Stack direction="row" justifyContent="space-between" >

                    <Stack direction="row" spacing={0.5} overflow={'hidden'} >
                        <IconButton color="info" >
                            <KeyboardArrowUp />
                        </IconButton>
                        <Box display="flex" alignItems={'center'} overflow="hidden" textOverflow="ellipsis" flexShrink={1} >
                            <Typography textAlign={'center'} noWrap overflow={'hidden'} > {workoutName} </Typography>
                        </Box>
                    </Stack>

                    {/*   <Badge variant='dot' color="error"> */}
                    <Box display="flex" alignItems={'center'} paddingRight={2} paddingLeft={1}>
                        {isActiveRestWatch ?
                            <Stack alignItems={'center'}>
                                <Typography textAlign={'center'} variant="body2" color="text.secondary"> Rest </Typography>
                                <StopWatch size={"h6"} isRestTimer={true} sx={{ color: "#6face8" }} />
                            </Stack>
                            :
                            <StopWatch size={"h6"} isRestTimer={false} />
                        }
                    </Box>
                    {/*   </Badge> */}
                </Stack>



            </AppBar>


    )
}

export default OngoingWorkoutBar