import { AppBar, Stack, Typography, Box, IconButton } from "@mui/material"
import { KeyboardArrowUp } from "@mui/icons-material"

import { useDispatch, useSelector } from "react-redux"
import { expand } from "../../redux/reducers/drawerReducer"

import StopWatch from "../Clock/StopWatch"

const OngoingWorkoutBar = () => {

    //console.log("RENDERING")

    const isActiveRestWatch = useSelector(state => state.stopWatch.restWatch.isActive)
    const workoutName = useSelector(state => state.workout.name) || "Untitled workout"
    const isAuthenticated = useSelector(state => state.user) ? true : false
    const isWorkoutActive = useSelector(state => state.workout.workoutStarted)

    const dispatch = useDispatch()

    return isAuthenticated && isWorkoutActive && (
        <AppBar
            onClick={() => dispatch(expand())}
            position="absolute"
            color=""
            sx={{
                top: 'auto',
                bgcolor: "#295596", //'#222326',
                justifyContent: "center",
                bottom: 59,
                padding: 1,
                right: "2%",
                width: 0.96,
                display: { xs: 'flex', md: 'none' },
                borderRadius: 3
            }}
        >
            <Stack direction="row" justifyContent="space-between" >
                <Stack direction="row" spacing={0.5} overflow={'hidden'} >
                    <IconButton color="info" >
                        <KeyboardArrowUp />
                    </IconButton>
                    <Box display="flex" alignItems={'center'} overflow="hidden" textOverflow="ellipsis" flexShrink={1} >
                        <Typography textAlign={'center'} noWrap overflow={'hidden'} > {workoutName} </Typography>
                    </Box>
                </Stack>
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
            </Stack>
        </AppBar>
    )
}

export default OngoingWorkoutBar