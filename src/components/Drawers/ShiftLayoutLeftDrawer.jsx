import { Drawer, Slide, Box } from "@mui/material"
import { useSelector } from "react-redux"

/**
 * pushes layout to left when workout component is shown, since the actual workout drawer is outside of router
 */

const ShiftLayoutLeftDrawer = () => {

    const isAuthenticated = useSelector(state => state.user) ? true : false
    const isWorkoutActive = useSelector(state => state.workout.workoutStarted)

    return (
       /*  <Slide direction="left" in={true} > */
            <Box

                sx={{
                    //zIndex: 0,
                    //width: { xs: 'none', md: 400, lg: 500 },
                    flexShrink: 0,
                    //width: {xs: 0, md: isWorkoutActive ? 400 : 0, lg: isWorkoutActive ? 500 : 0 },
                    transition: 'width 0.5s'
                    //display: { xs: 'none', md: 'block' },
                    /* '& .MuiDrawer-paper': {
                        width: { xs: 'none', md: 400, lg: 500 },
                        boxSizing: 'border-box',
                        bgcolor: 'transparent',
                        pointerEvents: 'none'
                    }, */
                }}
            >

            </Box>
      /*   </Slide> */
    )
}

export default ShiftLayoutLeftDrawer